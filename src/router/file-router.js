/* 用户文件管理接口路由的注册 */

const Router = require('koa-router');
const {
  verifyLogin
} = require('../middleware/auth-middleware');
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file-middlerware');
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file-controller');

const fileRouter = new Router({prefix: '/upload'});

// 用户上传头像
fileRouter.post('/avatar',
    verifyLogin,// 验证登录
    avatarHandler,// 处理上传的头像文件(保存到服务器本地)
    saveAvatarInfo);// 保存头像信息到数据库

// 用户上传动态配图
fileRouter.post('/picture',
    verifyLogin,// 验证登录
    pictureHandler,// 处理上传的动态配图(保存到服务器本地)
    pictureResize,// 对上传的动态配图保存多种不同的规格
    savePictureInfo);// 保存动态配图信息到数据库

module.exports = fileRouter;