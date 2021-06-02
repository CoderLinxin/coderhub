/* 用户登录接口路由的注册 */

const Router = require('koa-router');
const {
  login,
  success
} = require('../controller/auth-controller');

const {
  verifyAuth,
  verifyLogin
} = require('../middleware/auth-middleware');

const authRouter = new Router({prefix: '/login'});

// 用户登录接口(第一次登录)
authRouter.post('/',
    verifyAuth,// 拦截用户登录,对用户登录作一些校验
    login);

// 验证用户登录接口(测试用)
authRouter.post('/verify', verifyLogin, success);

module.exports = authRouter;