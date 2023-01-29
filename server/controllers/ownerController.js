const ApiError = require('../error/ApiError');
const { User, Owner } = require('../models/models');

class OwnerController {
  async findOwners(req, res, next) {
    try {
      const { subscriberId } = req.query;
      const owners = await Owner.findAll({ where: { subscriberId }, include: User });
      return res.json(owners);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async findOne(req, res, next) {
    try {
      const { subscriberId } = req.query;
      const owner = await Owner.findOne({ where: { subscriberId } });

      if (owner) {
        return res.json(true);
      }
      
      return res.json(false);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OwnerController();
