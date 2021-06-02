/* 用于拦截标签管理相关操作的中间件 */

const labelService = require('../service/label-service');

// 判断标签是否存在
const verifyLabelsExist = async (context, next) => {
  // 1.获取标签相关数据
  const {labels} = context.request.body;

  const labelIdArray = [];// 用于收集标签的id
  let labelId;

  // 2.数据库查询是否存在某一标签
  for (const labelName of labels) {
    const labelObj = await labelService.getLabelByName(labelName);
    if (labelObj === undefined) {// 不存在该标签则需插入标签到标签表
      const result = await labelService.createLabel(labelName);
      labelId = result.insertId;// 收集新插入标签的id
      context.body = '拦截标签~';
    } else {
      labelId = labelObj.id;// 收集标签表中已存在标签的id
    }
    labelIdArray.push(labelId);
  }
  context.labelIdArray = labelIdArray;// 传递给下一个中间件用于添加动态标签
  await next();
};

module.exports = {
  verifyLabelsExist
};