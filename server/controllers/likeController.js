const { Like, Post, Comment } = require('../models/models');
const ApiError = require('../error/ApiError');

const updatedPost = async (postId) => {
  const post = await Post.findOne({ where: { id: postId } });
  const newPost = await Post.update({ countLikes: post.countLikes + 1 }, { where: { id: postId } });
};

const updatedComment = async (commentId) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  const newComment = await Comment.update({ countLikes: comment.countLikes + 1 }, { where: { id: commentId } });
};

class LikeController {
  async likedPost(req, res, next) {
    try {
      const { postId, userId } = req.body;
      const findLike = await Like.findOne({ where: { postId, userId } });

      if (findLike) {
        return res.json('the like has already been');
      }

      const createdLike = await Like.create({ postId, userId });
      updatedPost(postId);

      return res.json(createdLike);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async likedComment(req, res, next) {
    try {
      const { commentId, userId } = req.body;
      const findLike = await Like.findOne({ where: { commentId, userId } });

      if (findLike) {
        return res.json('the like has already been');
      }

      const createdLike = await Like.create({ commentId, userId });
      updatedComment(commentId);

      return res.json(createdLike);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new LikeController();
