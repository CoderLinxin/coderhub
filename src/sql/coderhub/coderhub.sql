/*
 Navicat Premium Data Transfer

 Source Server         : 链接1
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : coderhub

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 02/06/2021 17:43:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (5, '1622536864276.jpg', 'image/jpeg', 34720, 13, '2021-06-01 16:41:04', '2021-06-01 16:41:04');
INSERT INTO `avatar` VALUES (6, '1622539686575.jpg', 'image/jpeg', 34720, 13, '2021-06-01 17:28:06', '2021-06-01 17:28:06');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `moment_id` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `comment_id` int(0) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (10, 'PHP是世界上最好的语言', 6, 2, NULL, '2021-05-29 16:31:10', '2021-05-29 16:31:10');
INSERT INTO `comment` VALUES (11, 'PHP是世界上最好的语言', 6, 2, NULL, '2021-05-29 16:31:34', '2021-05-29 16:31:34');
INSERT INTO `comment` VALUES (13, '世界上没有最好的语言~', 7, 2, 10, '2021-05-29 16:31:57', '2021-05-29 16:55:31');
INSERT INTO `comment` VALUES (14, '说错了,所有语言都是最好的语言~~', 6, 13, NULL, '2021-05-29 16:33:53', '2021-05-29 16:34:23');
INSERT INTO `comment` VALUES (15, '世界上没有最好的语言~', 7, 13, 10, '2021-05-29 16:33:57', '2021-05-29 16:55:34');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int(0) NULL DEFAULT NULL,
  `moment_id` int(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (5, '1622567094435.jpg', 'image/jpeg', 29294, 6, 13, '2021-06-02 01:04:56', '2021-06-02 01:04:56');
INSERT INTO `file` VALUES (6, '1622567094436.jpg', 'image/jpeg', 39962, 6, 13, '2021-06-02 01:04:56', '2021-06-02 01:04:56');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (1, '666', '2021-05-29 23:06:31', '2021-05-29 23:06:31');
INSERT INTO `label` VALUES (2, '大神', '2021-05-29 23:07:07', '2021-05-29 23:07:07');
INSERT INTO `label` VALUES (3, '清楚', '2021-05-29 23:08:15', '2021-05-29 23:08:15');
INSERT INTO `label` VALUES (5, '混沌', '2021-05-30 00:47:57', '2021-05-30 00:47:57');
INSERT INTO `label` VALUES (6, '我爱你', '2021-05-30 00:47:57', '2021-05-30 00:47:57');
INSERT INTO `label` VALUES (7, '喵喵喵', '2021-05-30 00:47:57', '2021-05-30 00:47:57');
INSERT INTO `label` VALUES (8, '好耶', '2021-05-30 01:09:21', '2021-05-30 01:09:21');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (6, '纵然再苦守数百年 我的心意 始终如一', 1, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (7, '曾几何时，他也好，她也好，都是这家伙的被害者。所以我才憎恶着。这个强求着所谓“大家”的世界。必须建立在牺牲某人之上才能成立的低劣的和平。以温柔和正义粉饰，明明是恶毒之物却登大雅之堂，随着时间的流逝越发凶恶，除欺瞒外别无其二的空虚的概念。过去和世界都是无法改变的。发生过的事情和所谓的“大家”都是无法改变的。但是，并不是说自己只能隶属于他们', 1, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (8, '不要告诉我你不需要保护，不要告诉我你不寂寞，知微，我只希望你，在走过黑夜的那个时辰，不要倔强的选择一个人。', 3, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (9, 'If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪，那么你也将失去群星了。', 1, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (11, '某一天，突然发现，许多结果都与路径无关。', 4, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (12, '限定目的，能使人生变得简洁。', 2, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (13, '翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来', 4, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (14, '一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。', 2, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (15, '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', 3, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (16, '如果你给我的，和你给别人的是一样的，那我就不要了。', 3, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (17, '故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。', 2, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (18, '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。', 2, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (19, '你如果认识从前的我，也许你会原谅现在的我。', 4, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (20, '', 2, '2021-05-28 17:09:46', '2021-05-28 19:23:20');
INSERT INTO `moment` VALUES (21, '向来缘浅，奈何情深。', 2, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (22, '心之所向 素履以往 生如逆旅 一苇以航', 3, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (23, '生如夏花之绚烂，死如秋叶之静美。', 3, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (24, '答案很长，我准备用一生的时间来回答，你准备要听了吗？', 4, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (25, '因为爱过，所以慈悲；因为懂得，所以宽容。', 4, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (26, 'C语言是世界上最好的语言~', 13, '2021-05-28 17:09:46', '2021-05-29 23:44:34');
INSERT INTO `moment` VALUES (27, '我来不及认真地年轻，待明白过来时，只能选择认真地老去。', 2, '2021-05-28 17:09:46', '2021-05-28 17:09:46');
INSERT INTO `moment` VALUES (28, 'javascript是世界上最好的语言!', 13, '2021-05-29 16:33:38', '2021-05-29 16:33:38');

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label`  (
  `moment_id` int(0) NOT NULL,
  `label_id` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`moment_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES (6, 5, '2021-05-30 01:08:39', '2021-05-31 16:23:29');
INSERT INTO `moment_label` VALUES (6, 7, '2021-05-30 01:08:39', '2021-05-31 16:23:32');
INSERT INTO `moment_label` VALUES (26, 2, '2021-05-30 01:08:39', '2021-05-30 01:08:39');
INSERT INTO `moment_label` VALUES (26, 6, '2021-05-30 01:08:39', '2021-05-30 01:08:39');
INSERT INTO `moment_label` VALUES (26, 8, '2021-05-30 01:09:21', '2021-05-30 01:09:21');
INSERT INTO `moment_label` VALUES (28, 2, '2021-05-30 01:20:52', '2021-05-30 01:20:52');
INSERT INTO `moment_label` VALUES (28, 5, '2021-05-30 01:20:52', '2021-05-30 01:20:52');
INSERT INTO `moment_label` VALUES (28, 6, '2021-05-30 01:20:52', '2021-05-30 01:20:52');
INSERT INTO `moment_label` VALUES (28, 7, '2021-05-30 01:20:52', '2021-05-30 01:20:52');
INSERT INTO `moment_label` VALUES (28, 8, '2021-05-30 01:20:52', '2021-05-30 01:20:52');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '赵高', '99c5e07b4d5de9d18c350cdf64c5aa3d', '2021-05-25 23:47:58', '2021-05-28 17:03:17', NULL);
INSERT INTO `users` VALUES (2, '孙悟空', 'c156aa39cd5a90728d4e15ebf443e406', '2021-05-25 23:48:52', '2021-05-28 17:07:25', NULL);
INSERT INTO `users` VALUES (3, '张三', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 17:03:04', '2021-05-28 17:07:35', NULL);
INSERT INTO `users` VALUES (4, '李四', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 17:07:45', '2021-05-28 17:08:03', NULL);
INSERT INTO `users` VALUES (5, '王五', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 17:07:49', '2021-05-28 17:08:08', NULL);
INSERT INTO `users` VALUES (6, '赵六', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 17:08:16', '2021-05-28 17:11:28', NULL);
INSERT INTO `users` VALUES (7, '猪八戒', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 17:11:50', '2021-05-28 17:13:04', NULL);
INSERT INTO `users` VALUES (11, '猪八戒2', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 18:38:22', '2021-05-28 18:38:22', NULL);
INSERT INTO `users` VALUES (12, '猪八戒3', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-28 18:43:01', '2021-05-28 18:43:01', NULL);
INSERT INTO `users` VALUES (13, '无极剑圣', 'e10adc3949ba59abbe56e057f20f883e', '2021-05-29 16:32:52', '2021-06-01 16:41:04', 'localhost:8000/users/13/avatar');

SET FOREIGN_KEY_CHECKS = 1;
