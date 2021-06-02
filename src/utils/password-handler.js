/* 用户密码相关处理方法 */

// 引入node自带的crypto库
const crypto = require('crypto');

// 对秘密进行md5加密的方法
const md5password = (password) => {
  const md5 = crypto.createHash('md5');// 采用md5的加密方式
  // 注意update的参数为字符串(如果是number类型直接不出结果(卡了我半小时))
  const result = md5.update(''+password).digest('hex');// 获取加密后的密码(hex表示以十六进制返回)
  return result;// 返回加密后的密码
};

module.exports = {
  md5password
};