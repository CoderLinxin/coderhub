/* 验证用户权限相关(数据库操作) */

const connection = require('../app/database');

class AuthService {
  // 数据库中查询是否有修改资源的权限(例如查询该动态是否是用户自己发表的)
  async checkResourceAuth(tableName, resourceId, userId) {
    const statement = `SELECT * FROM  ${tableName}
                          WHERE id = ? AND user_id = ?;`;
    try {
      const [result] = await connection.execute(statement, [resourceId, userId]);
      return !!result.length;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService();