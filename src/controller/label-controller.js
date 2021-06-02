/* 标签管理的控制函数 */

const labelService = require('../service/label-service');

class LabelController {
  // 创建标签
  async create(context, next) {
    const {labelName} = context.request.body;
    const result = await labelService.createLabel(labelName);
    context.body = result;
    await next();
  }

  // 获取标签列表
  async labelList(context, next){
    const {offset,size} = context.request.query;
    const result = await labelService.getLabelList(offset,size);
    context.body = result;
    await next();
  }
}

module.exports = new LabelController();