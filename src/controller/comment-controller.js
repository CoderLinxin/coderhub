/* 用户评论管理的控制函数 */

const commentService = require('../service/comment-service');

class CommentController {
  // 用户回复动态
  async create(context, next) {
    // 获取评论相关信息
    const {content, momentId} = context.request.body;
    const {id: userId} = context.user;

    // 数据库插入一条评论
    const result = await commentService.create(content, momentId, userId);
    context.body = result;
    await next();
  }

  // 用户回复评论(有回复的目标评论的id)
  async reply(context, next) {
    // 获取评论相关信息
    const {content, momentId} = context.request.body;
    const {id: userId} = context.user;
    const {commentId} = context.params;

    // 数据库插入一条评论
    const result = await commentService.create(content, momentId, userId, commentId);
    context.body = result;
    await next();
  }

  // 用户修改评论
  async update(context, next) {
    // 获取更新的评论信息
    const {commentId} = context.params;
    const {content} = context.request.body;

    // 数据库修改该条评论
    const result = await commentService.update(commentId, content);
    context.body = result;
    await next();
  }

  // 用户删除评论
  async remove(context, next) {
    // 获取更新的评论信息
    const {commentId} = context.params;

    // 数据库修改该条评论
    const result = await commentService.remove(commentId);
    context.body = result;
    await next();
  }

  // 根据动态ID获取评论列表
  async commentList(context, next) {
    // 获取更新的评论信息
    const {momentId} = context.query;

    // 数据库修改该条评论
    const result = await commentService.getCommentsByMomentId(momentId);
    context.body = result;
    await next();
  }
}

module.exports = new CommentController();