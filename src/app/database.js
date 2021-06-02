/* 数据库相关操作 */

const mysql2 = require('mysql2');// mysql2库

const config = require('./config');

// 创建连接池
const connections = mysql2.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  charset: config.MYSQL_CHARSET
});

// 测试连接
connections.getConnection((error, connection) => {
  if (error)
    console.log('连接失败~');
  else
    console.log('数据库连接成功~');
});

// 导出数据库连接(连接使用promise处理返回)
module.exports = connections.promise();