/* 统一进行路由的使用 */

const fs = require('fs');

// 该函数需要作为app的方法来调用才有效
function userRoutes() {
  // 读取当前路径文件夹中的所有文件名
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;

    // 注意别写成require(file),这样会当成node非核心模块查找(只在各层目录下的node_modules中查找)
    const router =  require(`./${file}`);// 获取对应文件导出的路由

    // 使用路由
    this.use(router.routes());
    this.use(router.allowedMethods());
  })
}

module.exports = userRoutes;