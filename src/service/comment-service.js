/* 用户评论管理系统数据库相关操作 */

const connection = require('../app/database');

class CommentService {
  // 数据库中插入一条评论
  async create(content, momentId, userId, commentId = null) {
    try {
      const statement = `INSERT INTO 
                            comment 
                            (content,moment_id,user_id,comment_id) VALUES(?,?,?,?);`;
      const result = await connection.execute(statement, [content, momentId, userId, commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 数据库中更新一条评论
  async update(commentId, content) {
    try {
      const statement = `UPDATE  comment SET content = ? WHERE id = ?;`;
      const [result] = await connection.execute(statement, [content, commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 数据库中删除一条评论
  async remove(commentId) {
    try {
      const statement = `DELETE from comment WHERE id = ?;`;
      const [result] = await connection.execute(statement, [commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 数据库中根据动态ID查询评论列表
  async getCommentsByMomentId(momentId){
    try {
      const statement = `SELECT m.id,m.content,m.comment_id commentId,m.createAt creatTime,
                            JSON_OBJECT('id',u.id,'name',u.name) user
                            FROM comment m
                            LEFT JOIN users u ON u.id = m.user_id 
                            WHERE moment_id = ?;`;
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentService();