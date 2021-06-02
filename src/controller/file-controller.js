/* 处理上传文件相关操作的控制函数 */

const fileService = require('../service/file-service');
const userService = require('../service/user-service');
const {
  APP_HOST,
  APP_PORT
} = require('../app/config');

class FileController {
  // 保存头像信息
  async saveAvatarInfo(context, next) {
    // 收集头像相关信息
    const {filename, mimetype, size} = context.req.file;
    const {id: userId} = context.user;

    // 提交到数据库
    const result = await fileService.createAvatar(userId, filename, mimetype, size);

    // 将用户头像地址(指的是给前端展示头像的接口)保存到用户表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, userId);

    context.body = '上传用户头像成功~';
    await next();
  }

  // 保存用户配图信息
  async savePictureInfo(context, next) {
    // 收集用户上传的动态配图相关信息
    const {id: userId} = context.user;
    const {momentId} = context.query;
    const files = context.req.files;

    // 将用户上传的动态配图相关信息进行保存
    for (const file of files) {
      const {filename, mimetype, size} = file;
      await fileService.createPictures(filename, mimetype, size,momentId, userId );
    }

    context.body = '上传动态配图成功~';
    await next();
  }
}

module.exports = new FileController();