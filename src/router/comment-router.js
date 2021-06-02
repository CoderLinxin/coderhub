/* 用户评论接口路由的注册 */

const Router = require('koa-router');
const {
  verifyLogin,
  verifyPermission
} = require('../middleware/auth-middleware');

const {
  create,
  reply,
  update,
  remove,
  commentList
} = require('../controller/comment-controller');

const commentRouter = new Router({prefix: '/comment'});

// 用户回复动态接口
commentRouter.post(
    '/',
    verifyLogin,// 验证Token
    create);// 创建一条评论

// 用户回复评论接口
commentRouter.post(
    '/:commentId/reply',// 需要获取回复的目标评论的id
    verifyLogin,// 验证Token
    reply);// 创建一条回复评论

// 修改用户评论接口
commentRouter.patch(
    '/:commentId',// 需要获取回复的目标评论的id
    verifyLogin,// 验证Token
    verifyPermission('comment','commentId'),// 验证用户是否有修改该评论的权限(该评论是否是用户本人发送的)
    update);// 修改用户评论

// 删除用户评论接口
commentRouter.delete(
    '/:commentId',// 需要获取回复的目标评论的id
    verifyLogin,// 验证Token
    verifyPermission('comment','commentId'),// 验证用户是否有删除该评论的权限(该评论是否是用户本人发送的)
    remove);// 修改用户评论

// 获取用户评论列表接口
commentRouter.get(
    '/',
    commentList);// 用户评论列表

module.exports = commentRouter;