/* 用户注册接口路由的注册 */

const Router = require('koa-router');// 路由

const {verifyUser, passwordHandler} = require('../middleware/user-middleware');
const userService = require('../service/file-service');

const {
  create,
  avatarInfo
} = require('../controller/user-controller');// user路由逻辑相关

const userRouter = new Router({prefix: '/users'});

// 用户注册
userRouter.post('/',
    verifyUser,// 判断用户名和密码的合法性
    passwordHandler,// 对用户密码的进一步处理
    create);

// 展示用户头像接口:
userRouter.get(
    '/:userId/avatar',// 这里根据userId查询
    avatarInfo);

module.exports = userRouter;
