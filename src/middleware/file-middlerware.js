/* 用于拦截处理文件上传相关操作的中间件 */

const path = require('path');
const multer = require('koa-multer');
const Jimp = require('jimp');// 处理图片
const {
  avatarStorageConfig,
  pictureStorageConfig
} = require('../app/file-config');// 用户文件上传路径的配置

// 用户头像配置相关
const avatarStorage = multer.diskStorage(avatarStorageConfig);
const avatarUpload = multer({storage: avatarStorage});// 使用storage属性不会自动创建文件夹
const avatarHandler = avatarUpload.single('avatar');// 处理用户上传的头像

// 用户动态配图相关
const pictureStorage = multer.diskStorage(pictureStorageConfig);
const pictureUpload = multer({storage: pictureStorage});// 使用storage属性不会自动创建文件夹
const pictureHandler = pictureUpload.array('picture', 9);// 处理用户上传的动态配图

// 对图片进行处理
const pictureResize = async (context, next) => {
  try {
    // 获取用户上传的所有动态配图信息
    const files = context.req.files;

    // 每个配图额外保存多种规格的文件
    for (const file of files) {// file.path表示文件的路径(包括文件名),file.destination(表示文件所在目录(不包括文件名))
      // 读取对应路径下的配图原图(并对原图进行调整之后重新存储)
      Jimp.read(file.path).then(image=>{// 这里就不要使用await造成阻塞了,用户上传完配图后服务器自己进行相关处理
        // resize(1280,Jimp.AUTO)表示高度固定宽度自适应,write表示写入对应路径
        image.resize(1280,Jimp.AUTO).write(`${file.destination}/large-${file.filename}`);
        image.resize(640,Jimp.AUTO).write(`${file.destination}/middle-${file.filename}`);
        image.resize(320,Jimp.AUTO).write(`${file.destination}/small-${file.filename}`);
      })
    }
  } catch (error) {
    console.log(error);
  }

  await next();
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
};
