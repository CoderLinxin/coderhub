/* 用户注册接口路由具体逻辑定义 */

const fs = require('fs');
const userService = require('../service/user-service');// user数据库操作相关
const fileService = require('../service/file-service');
const {AVATAR_PATH} = require('../constants/file-type');

class UserController {
  // 注册用户接口定义
  async create(context, next) {
    // 数据库查询数据
    const result = await userService.create(context.request.body);

    // 返回响应数据
    context.body = result;
  }

  // 获取用户头像信息
  async avatarInfo(context, next) {
    // 根据用户ID查询用户头像信息
    const {userId} = context.params;
    const result = await fileService.getAvatarByUserId(userId);

    // 向前端提供用户头像信息
    context.response.set('content-type',result.mimetype);// 需要告诉浏览器文件类型
    context.body = fs.readFileSync(`${AVATAR_PATH}/${result.filename}`);// 读取用户头像文件然后发送给浏览器
  }
}

module.exports = new UserController();