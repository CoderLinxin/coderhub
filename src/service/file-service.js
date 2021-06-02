/* 文件上传数据库操作相关 */

const connection = require('../app/database');

class FileService {
  // 保存头像信息到数据库中
  async createAvatar(userId, filename, mimetype, size) {
    try {
      const statement = `INSERT INTO avatar (user_id,filename,mimetype,size) VALUES (?,?,?,?);`;
      const [result] = await connection.execute(statement, [userId, filename, mimetype, size]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 根据用户id获取用户头像信息
  async getAvatarByUserId(userId) {
    try {
      const statement = `SELECT * FROM avatar WHERE user_id = ?`;
      const [result] = await connection.execute(statement, [userId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  // 将用户动态配图信息保存到数据库
  async createPictures(filename, mimetype, size, momentId, userId) {
    try {
      const statement = `INSERT INTO file (filename,mimetype,size,moment_id,user_id) VALUES (?,?,?,?,?);`;
      await connection.execute(statement, [filename, mimetype, size, momentId, userId]);
    } catch (error) {
      console.log(error);
    }
  }

  // 根据filename查询对应的动态配图相关信息
  async getFileByFilename(filename) {
    try {
      const statement = `SELECT * FROM file WHERE filename = ?;`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileService();