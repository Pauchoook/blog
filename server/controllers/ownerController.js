const ApiError = require('../error/ApiError');
const { User, Owner, Subscriber } = require('../models/models');

const updatedSubscriber = async (ownerId) => {
  const user = await User.findOne({where: {id: ownerId}});
  const newUser = await User.update({countSubscribers: user.countSubscribers - 1}, {where:{id: ownerId}});
}

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
      const { id } = req.params;
      const owner = await Owner.findOne({ where: { subscriberId: id } });

      if (owner) {
        return res.json(true);
      }
      
      return res.json(false);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async unsubscribe(req, res, next) {
    try {
      const { ownerId, subscriberId } = req.query;
      const deleteOwner = await Owner.destroy({ where: { subscriberId, userId: ownerId }});
      const deleteSubscriber = await Subscriber.destroy({ where: { ownerId, userId: subscriberId } })

      updatedSubscriber(ownerId);
      return res.json(deleteOwner);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OwnerController();
