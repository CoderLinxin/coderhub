/* 统一管理公共操作 */

const Koa = require('koa');// http框架

const bodyParser = require('koa-bodyparser');// json解析
const {errorHandler} = require('../app/error-handle');// 错误处理函数
const userRoutes = require('../router/index');// 路由使用函数

const app = new Koa();

app.userRoutes = userRoutes;// userRoutes的this赋值

app.use(bodyParser());// body数据处理
app.userRoutes();// 使用所有路由

app.on('error', errorHandler);// 错误处理

module.exports = app;