const { Comment, User, Like } = require('../models/models');
const ApiError = require('../error/ApiError');

class CommentController {
  async create(req, res, next) {
    try {
      const { comment, postId, userId } = req.body;

      const createdComment = await Comment.create({ comment, postId, userId });

      return res.json(createdComment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res, next) {
    try {
      const { postId, limit } = req.query;
      const comments = await Comment.findAndCountAll({where: {postId}, limit, include: User});

      return res.json(comments);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.destroy({ where: { id } });

      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new CommentController();
