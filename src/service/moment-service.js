/* 用户内容管理系统数据库操作相关 */

const connection = require('../app/database');

class MomentService {
  // 将用户发表的动态插入数据库
  async create({userId, content}) {
    const statement = `INSERT INTO moment (user_id,content) values(?,?);`;
    const [result] = await connection.execute(statement, [userId, content]);
    return result;
  }

  // 根据用户动态的id去数据库查询动态相关信息
  async getMomentById(momentId) {
    const statement =
        `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
          JSON_OBJECT(
                        'id',u.id,'name',u.name,'avatarUrl',u.avatar_url
                      ) user,
          IF(
              COUNT(c.id),JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,
              'createTime',c.createAt,'user',JSON_OBJECT('id',u2.id,'name',u2.name,'avatarUrl',u2.avatar_url))),NULL
             ) comments,
          (
            SELECT IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) 
            FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id WHERE ml.moment_id = m.id
          ) label,
          ( 
            SELECT JSON_ARRAYAGG(CONCAT('localhost:8000/moment/pictures/',file.filename)) 
            FROM file WHERE m.id = file.moment_id
          ) pictures
          FROM moment m 
          LEFT JOIN users u ON m.user_id = u.id -- 查询对应用户信息
          LEFT JOIN comment c ON c.moment_id = m.id -- 查询对应评论信息
          LEFT JOIN users u2 ON c.user_id = u2.id -- 查询对应评论对应的用户信息
          WHERE m.id = ?
          GROUP BY m.id;`; // 使用mysql2用到JSON_ARRAYAGG有时候需要手动加分组
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }

  // 获取用户一页动态列表(需要偏移量(offset)和一页的大小(size))
  async getMomentList(offset, size) {
    try{
      const statement = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
                          JSON_OBJECT('id',u.id,'name',u.name) user,
                          (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
                          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
                          (SELECT JSON_ARRAYAGG(CONCAT('localhost:8000/moment/pictures/',file.filename)) 
                           FROM file WHERE m.id = file.moment_id) pictures
                          FROM moment m 
                          LEFT JOIN users u ON m.user_id = u.id
                          LIMIT ?,?;`;
      const [result] = await connection.execute(statement, [offset, size]);
      return result;
    }catch (error) {
      console.log(error);
    }
  }

  // 修改用户动态
  async updateMoment(content, momentId) {
    try {
      const statement = `UPDATE moment 
                          SET content = ? WHERE id = ?;`;
      const result = await connection.execute(statement, [content, momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 删除用户动态
  async removeMomentById(momentId) {
    try {
      const statement = `DELETE FROM moment WHERE moment.id = ?;`;
      const result = await connection.execute(statement, [momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 根据动态id和标签id判断动态下是否存在该标签
  async hasLabel(momentId, labelId) {
    try {
      const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
      const [result] = await connection.execute(statement, [momentId, labelId]);
      return !!result.length;
    } catch (error) {
      console.log(error);
    }
  }

  // 给动态添加一个标签(通过关系表)
  async addLabel(momentId, labelId) {
    try {
      const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`;
      const [result] = await connection.execute(statement, [momentId, labelId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentService();