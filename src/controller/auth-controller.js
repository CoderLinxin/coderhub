/* 用户登录(已被授权)相关的控制处理函数 */

const jwt = require('jsonwebtoken');

const {PRIVATE_KEY} = require('../app/config');// 获取私钥

// 用于用户登录的控制函数
class AuthController {

  // 处理用户第一次成功登录
  async login(context, next) {
    const {id, name} = context.user;// 获取对应的用户信息

    // 颁发Token
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,// 设置Token过期时间
      algorithm: 'RS256'
    });

    context.body = {id, name, token}
  }

  // 处理用户携带Token的成功登录
  async success(context, next) {
    context.body = 'Token验证成功~';
  }
}


module.exports = new AuthController();
