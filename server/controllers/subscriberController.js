const ApiError = require('../error/ApiError');
const { Subscriber, User, Owner } = require('../models/models');

const updatedSubscribers = async (ownerId) => {
  const user = await User.findOne({where: {id: ownerId}});
  const newUser = await User.update({countSubscribers: user.countSubscribers + 1}, {where:{id: ownerId}});
}

class SubscriberController {
  async create(req, res, next) {
    try {
      const {userId, ownerId} = req.body;

      const findOwner = await Subscriber.findOne({where: {userId, ownerId}});

      if (findOwner) {
        return res.json('you have already subscribed')
      }

      const subscriber = await Subscriber.create({userId, ownerId});
      const owner = await Owner.create({subscriberId: userId, userId: ownerId});

      updatedSubscribers(ownerId);
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