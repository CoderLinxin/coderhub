/* 用户发表动态内容相关的处理函数 */

const fs = require('fs');
const momentService = require('../service/moment-service');
const fileService = require('../service/file-service');
const {PICTURE_PATH} = require('../constants/file-type');

class MomentController {
  // 创建一条用户动态
  async create(context, next) {
    const userId = context.user.id;// 用来标识发表动态的该用户(需要在数据库moment表中存储)
    const content = context.request.body.content;// 获取用户发表的动态内容

    const result = await momentService.create({userId, content});
    context.body = result;
  }

  // 根据动态ID查看一条用户动态
  async detail(context, next) {
    const momentId = context.params.momentId;// 获取用户的动态id
    const moment = await momentService.getMomentById(momentId);// 根据动态id从数据库查询相应的用户动态信息
    context.body = moment;
    await next();
  }

  // 获取用户动态列表(接口示例:/moment?offset=1&size=10)
  async detailList(context, next) {
    const {offset, size} = context.query;
    const momentList = await momentService.getMomentList(offset, size);
    context.body = momentList;
    await next();
  }

  // 修改用户动态的处理函数
  async update(context, next) {
    // 获取动态相关信息
    const {content} = context.request.body;
    const {momentId} = context.params;

    // 修改用户动态
    const result = await momentService.updateMoment(content, momentId);
    context.body = `修改动态成功~:${result}`;
    await next();
  }

  // 删除用户动态
  async remove(context, next) {
    const {momentId} = context.params;
    const result = await momentService.removeMomentById(momentId);
    context.body = result;
    await next();
  }

  // 动态添加标签(多个)
  async addLabels(context, next) {
    // 获取动态及标签相关信息
    const labelsId = context.labelIdArray;
    const {momentId} = context.params;

    // 判断这些标签在动态下是否存在
    for (const labelId of labelsId) {
      if (!await momentService.hasLabel(momentId, labelId)) {// 如果动态下不存在同名标签才插入标签
        await momentService.addLabel(momentId, labelId);
      }
    }
    context.body = '动态添加标签成功~';
    await next();
  }

  // 获取动态配图信息
  async pictureInfo(context, next) {
    // 根据filename在动态配图信息表中查询相应信息
    let {filename} = context.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const {type} = context.query;
    const types = ['small', 'middle', 'large'];
    if (types.some(item => item === type))
      filename = type + '-' + filename;

    // 设置content-type
    context.response.set('content-type', fileInfo.mimetype);
    context.body = fs.readFileSync(`${PICTURE_PATH}/${filename}`);// 读取动态配图并返回给客户端
  }
}

module.exports = new MomentController();