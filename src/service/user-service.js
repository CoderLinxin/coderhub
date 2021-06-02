/* 用户注册接口路由数据库操作相关 */

const connection = require('../app/database');// 数据库连接

class UserService {
  // 创建用户的方法
  async create(user) {
    // 获取用户数据
    const {name, password} = user;

    // 将用户数据插入数据库
    const statement = `INSERT INTO users (name,password) values(?,?);`;
    const result = await connection.execute(statement, [name, password]);

    return result[0];// 返回插入结果
  }

  // 查询用户名是否存在
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];// 返回查询结果
  }

  async updateAvatarUrlById(avatarUrl,userId){
   try{
     const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
     const result = await connection.execute(statement, [avatarUrl,userId]);
     return result[0];// 返回查询结果
   }catch (error) {
     console.log(error);
   }
  }
}

module.exports = new UserService();