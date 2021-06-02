/* 错误处理方法定义 */

const errorTypes = require('../constants/error-types');

const errorHandler = (error, context) => {
  let status, message;

  // 错误类型判断
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;// Bad Request
      message = '用户名或密码不能为空~';
      break;
    case  errorTypes.USER_ALREADY_EXISTS:
      status = 409;// conflict:冲突
      message = '用户名已存在~';
      break;
    case  errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;// 参数错误
      message = '用户名不存在~';
      break;
    case  errorTypes.PASSWORD_IS_WRONG:
      status = 400;
      message = '密码输入错误~';
      break;
      case  errorTypes.UNAUTHORIZED:
      status = 401;
      message = '无效的Token~';
      break;
      case  errorTypes.WITHOUT_PERMISSION:
      status = 401;
      message = '没有权限进行操作~';
      break;
    default:
      status = 404;
      message = 'NOT FOUND~';
  }

  context.status = status;
  context.body = message;
};

module.exports = {
  errorHandler
};



