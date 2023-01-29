const uuid = require('uuid');
const path = require('path');
const {Post, User, Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class PostController {
  async create(req, res, next) {
    try {
      const {title, body, userId, typeId} = req.body;
      const {img} = req.files;
      let filename = uuid.v4() + '.jpg';

      img.mv(path.resolve(__dirname, '..', 'static', filename));

      const post = await Post.create({title, body, userId, typeId, img: filename});

      return res.json(post);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let {title, limit, page} = req.query;
      let posts;

      page = page || 1;
      limit = limit || 4;

      let offset = page * limit - limit;

      if (title) {
        posts = await Post.findAndCountAll({where: {title}, limit, offset, include: [User, Type]});
      } else {
        posts = await Post.findAndCountAll({limit, offset, include: [User, Type]});
      }

      return res.json(posts);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const post = await Post.findOne({where: {id}, include: [User, Type]});

      return res.json(post);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const post = req.body;
      const newPost = await Post.update({...post}, {where:{id: post.id}});
      return res.json(newPost)
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {

    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = new PostController();