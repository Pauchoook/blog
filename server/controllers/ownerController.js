const ApiError = require('../error/ApiError');
const { User, Owner, Subscriber } = require('../models/models');

const updatedOwnerSubscriber = async (ownerId, subsriberId) => {
  const owner = await User.findOne({ where: { id: ownerId } });
  const subscriber = await User.findOne({ where: { id: subsriberId } });

  const newOwner = await User.update({ countSubscribers: owner.countSubscribers - 1 }, { where: { id: ownerId } });
  const newSubscriber = await User.update({ countOwners: subscriber.countOwners - 1 }, { where: { id: subsriberId } });
};

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

  async isSubscribe(req, res, next) {
    try {
      const { subscriberId, ownerId } = req.query;
      const owner = await Owner.findOne({ where: { subscriberId, userId: ownerId } });

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
      const { userId, subscriberId } = req.body;

      const deleteOwner = await Owner.destroy({ where: { subscriberId, userId } });
      const deleteSubscriber = await Subscriber.destroy({ where: { ownerId: userId, userId: subscriberId } });

      // убавляем кол-во подписчиков у owner и кол-во подписок у subscriber
      updatedOwnerSubscriber(userId, subscriberId);
      return res.json(deleteOwner);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OwnerController();
