/* 配置文件:用于配置项目公共的资源 */

const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');

// 默认读取项目根目录下的.env文件,并写入环境变量process.env中
dotenv.config();

// 读取私钥和公钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

// 导出环境变量:注意使用process.env作为node模块对象导出时,该模块对象对应的属性不能是引用类型(例如对象,函数..)会被自动转化为string字符串
module.exports = {// 解构赋值
  APP_HOST,
  APP_PORT,

  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CHARSET,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;