const ApiError = require('../error/ApiError');
const { Subscriber, User, Owner } = require('../models/models');

const updatedOwnerSubscriber = async (ownerId, subscriberId) => {
  const owner = await User.findOne({where: {id: ownerId}});
  const subscriber = await User.findOne({where: {id: subscriberId}});

  const newOwner = await User.update({countSubscribers: owner.countSubscribers + 1}, {where:{id: ownerId}});
  const newSubscriber = await User.update({countOwners: subscriber.countOwners + 1}, {where:{id: subscriberId}});
}

class SubscriberController {
  async create(req, res, next) {
    try {
      const {userId, ownerId} = req.body;

      const findSubscriber = await Subscriber.findOne({where: {userId, ownerId}});

      if (findSubscriber) {
        return res.json('you have already subscribed')
      }

      const subscriber = await Subscriber.create({userId, ownerId});
      const owner = await Owner.create({subscriberId: userId, userId: ownerId});

      // у ownera прибавляем кол-во подписчиков, а у subscriber кол-во погдписок
      updatedOwnerSubscriber(ownerId, userId);
      return res.json(subscriber);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async findSubscribers(req, res, next) {
    try {
      const {ownerId} = req.query;
      const subsribers = await Subscriber.findAll({where: {ownerId}, include: User});
      return res.json(subsribers);
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new SubscriberController();