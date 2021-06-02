/* 程序入口:主要用于初始化项目 */

const app = require('./app/index');// app
const config = require('./app/config');// 配置文件

app.listen(config.APP_PORT, '0.0.0.0', () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`);
});