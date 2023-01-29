const ApiError = require('../error/ApiError');
const { Type } = require('../models/models');

class TypeController {
  async create(req, res, next) {
    try {
      const {name} = req.body;

      const findType = await Type.findOne({where: {name}});
      if (findType) {
        return res.json({message: 'this type already exists'});
      }

      const type = await Type.create({name});
      return res.json(type);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TypeController();