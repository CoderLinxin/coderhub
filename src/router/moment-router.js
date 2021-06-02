/* (用户动态管理)内容管理系统路由的注册 */

const Router = require('koa-router');
const {verifyLogin, verifyPermission} = require('../middleware/auth-middleware');// token验证
const {
  create,
  detail,
  detailList,
  update,
  remove,
  addLabels,
  pictureInfo
} = require('../controller/moment-controller');// 用于用户内容管理
const {
  verifyLabelsExist
} = require('../middleware/label-middleware');

const momentRouter = new Router({prefix: '/moment'});

// 用户发表动态的接口
momentRouter.post('/',
    verifyLogin,// 验证Token
    create);

// 获取用户发表的一条动态信息的接口(请求需要携带发表的动态的id)
momentRouter.get('/:momentId', detail);

// 获取用户动态列表（多个）:(接口示例:/moment?offset=1&size=10)
momentRouter.get('/', detailList);

// 根据动态ID修改用户动态
momentRouter.patch('/:momentId',
    verifyLogin,// 验证Token
    verifyPermission('moment', 'momentId'),// 判断用户是否有权限修改动态
    update);// 更新动态

// 根据动态ID删除用户动态
momentRouter.delete('/:momentId',
    verifyLogin,// 验证Token
    verifyPermission('moment', 'momentId'),// 判断用户是否有权限删除动态
    remove);// 更新动态

// 动态添加标签(可多个)接口
momentRouter.post('/:momentId/labels',
    verifyLogin,// 验证Token
    verifyPermission('moment', 'momentId'),// 判断用户是否有权限设置动态
    verifyLabelsExist,// 判断添加的标签是否在标签表中存在(不存在则需要创建)
    addLabels);// 添加标签(需要判断该动态下是否已经添加了同名标签)

// 展示用户的动态配图的接口
momentRouter.get(
    '/pictures/:filename',// 这里根据filename进行查询
    pictureInfo);// 展示动态配图信息

module.exports = momentRouter;