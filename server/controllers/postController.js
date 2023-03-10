const uuid = require('uuid');
const path = require('path');
const { Post, User, Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class PostController {
  async create(req, res, next) {
    try {
      const { title, body, userId, typeId } = req.body;
      const { img } = req.files;
      let filename = uuid.v4() + '.jpg';

      img.mv(path.resolve(__dirname, '..', 'static', filename));

      const post = await Post.create({ title, body, userId, typeId, img: filename });

      return res.json(post);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { title, limit, page, typeId, userId, order } = req.query;
      let posts;

      page = page || 1;
      limit = limit || 4;

      let offset = page * limit - limit;

      if (title) {
        posts = await Post.findAndCountAll({ where: { title }, limit, offset, include: [User, Type] });
      } else if (typeId) {
        posts = await Post.findAndCountAll({ where: { typeId }, limit, offset, include: [User, Type] });
      } else if (title && typeId) {
        posts = await Post.findAndCountAll({ where: { title, typeId }, limit, offset, include: [User, Type] });
      } else if (userId) {
        posts = await Post.findAndCountAll({ where: { userId }, limit, offset, include: Type });
      } else if (userId && order) {
        posts = Post.findAndCountAll({where: {userId}, limit, offset, order: [['createdAt', order]]})
      } else {
        posts = await Post.findAndCountAll({ limit, offset, include: [User, Type] });
      }

      return res.json(posts);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ where: { id }, include: [User, Type] });

      return res.json(post);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const post = req.body;
      const { img } = req.files;

      const editPost = {
        ...post,
      };

      if (img) {
        let filename = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', filename));

        editPost.img = filename;
      }

      const newPost = await Post.update({ ...editPost }, { where: { id: post.id } });
      return res.json();
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

module.exports = new PostController();
