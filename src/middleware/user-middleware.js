/* 用于拦截用户注册相关操作的中间件 */

const errorTypes = require('../constants/error-types');// 错误类型
const service = require('../service/user-service');// 数据库操作
const {md5password} = require('../utils/password-handler');// 密码加密

// 用于拦截用户注册的中间件
const verifyUser = async (context, next) => {
  // 获取用户名和密码
  const {name, password} = context.request.body;

  // 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return context.app.emit('error', error, context);// 发射错误响应
  }

  // 判断用户名是否已经被注册
  const result = await service.getUserByName(name);
  if (result.length) {// 查询结果不为空数组则代表用户名已经存在
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return context.app.emit('error', error, context);// 直接返回不执行下一个中间件
  }

  // 进入下一个中间件
  await next();
};

// 用于用户密码处理的中间件
const passwordHandler = async (context, next) => {
  let {password} = context.request.body;// 获取密码的明文
  context.request.body.password = md5password(password);// 更新为加密后的密码
  await next();
};

module.exports = {
  verifyUser,
  passwordHandler
};