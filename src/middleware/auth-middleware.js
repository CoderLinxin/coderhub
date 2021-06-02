/* 用于拦截用户登录相关操作的中间件 */

const errorTypes = require('../constants/error-types');
const userService = require('../service/user-service');// 用户数据库操作相关
const authService = require('../service/auth-service');// 验证用户权限(数据库操作)相关
const {md5password} = require('../utils/password-handler');// 密码加密
const jwt = require('jsonwebtoken');// token处理
const {PUBLIC_KEY} = require('../app/config');

// 对用户名和密码进行校验的中间件
const verifyAuth = async (context, next) => {
  // 1.获取用户名和密码
  const {name, password} = context.request.body;

  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return context.app.emit('error', error, context);// 发射错误响应
  }

  // 3.判断用户是否存在(检验用户名)
  const result = await userService.getUserByName(name);// 返回的是一个数组
  const user = result[0];// 拿到对应的用户信息

  if (!user) {// 用户如果不存在
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return context.app.emit('error', error, context);// 直接返回不执行下一个中间件
  }

  // 4.判断密码是否与数据库中的密码一致(校验密码)
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_WRONG);
    return context.app.emit('error', error, context);// 直接返回不执行下一个中间件
  }

  // 5.拿到对应的用户信息(用于接下来给验证成功的用户颁发Token)
  context.user = user;
  await next();
};

// 验证用户Token
const verifyLogin = async (context, next) => {
  // 获取token
  const authorization = context.headers.authorization;
  if (!authorization) {// 如果没有携带Token
    const error = new Error(errorTypes.UNAUTHORIZED);
    return context.app.emit('error', error, context);
  }
  const token = authorization.replace('Bearer ', '');

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithm: ['RS256', 'HS256']
    });
    context.user = context.body = result;// 验证Token成功后传递用户数据用于后续用户相关操作
    await next();
  } catch (error) {
    const err = new Error(errorTypes.UNAUTHORIZED);
    return context.app.emit('error', err, context);
  }
};

/**
 * 验证用户是否有访问某个资源的权限(注意外层函数不要有async(加了async会被koa误认为以外层函数是一个中间件))
 * @param tableName:需要操作的目标表名
 * @param resourceKey:需要操作的目标表的目标行的id所对应的前端传来的params参数名
 * @returns {function(...[*]=)}:验证是否有操作目标资源的中间件
 */
const verifyPermission = (tableName, resourceKey) => {
  return async (context, next) => {// 返回一个中间件(通过闭包的方式指定中间件处理对应的表和表的属性行id)
    // 获取当前要访问的资源的id(表中的属性行id)
    const resourceId = context.params[resourceKey];
    const {id:userId} = context.user;// 获取资源对应的用户id

    // 根据获取的资源参数去数据库中查询是否有修改对应资源(表)的权限
    const ifPermission = await authService.checkResourceAuth(tableName, resourceId, userId);
    if (!ifPermission) {// 假设没有权限
      const error = new Error(errorTypes.WITHOUT_PERMISSION);
      context.app.emit('error', error, context);
    } else {
      await next();
    }
  }
};

module.exports = {
  verifyAuth,
  verifyLogin,
  verifyPermission
};