/* 上传文件相关设置 */

const path = require('path');
const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-type');

// 用于管理用户头像上传路径
const avatarStorageConfig = {
  destination(request, file, callback) {
    callback(null, AVATAR_PATH);
  },
  filename(request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  }
};

// 用于管理用户动态配图头像上传路径
const pictureStorageConfig = {
  destination(request, file, callback) {
    callback(null, PICTURE_PATH);
  },
  filename(request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  }
};

module.exports = {
  avatarStorageConfig,
  pictureStorageConfig
};
