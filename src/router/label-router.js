/* 标签管理接口路由的注册 */

const {
  verifyLogin
} = require('../middleware/auth-middleware');

const {
  create,
  labelList
} = require('../controller/label-controller');

const Router = require('koa-router');

const labelRouter = new Router({prefix: '/labels'});

// (简单)创建标签接口
labelRouter.post('/',
    verifyLogin,
    create);

// 获取标签列表接口
labelRouter.get('/',
    labelList);

module.exports = labelRouter;