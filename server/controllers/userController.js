const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

const generateJwt = (id, email, nikname, avatar, countSubscribers) => {
  return jwt.sign({ id, email, nikname, avatar, countSubscribers }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, nikname } = req.body;
      // const {avatar} = req.files;
      // let fileName = uuid.v4() + '.jpg';

      if (!email || !password) {
        return next(ApiError.badRequest('Неккоректный email или пароль'));
      }

      const candidateEmail = await User.findOne({ where: { email } });
      const candidateNikname = await User.findOne({ where: { nikname } });

      if (candidateNikname) {
        return next(ApiError.badRequest('Пользователь с таким nikname уже существует'));
      }
      if (candidateEmail) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      // avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
      const user = await User.create({ email, password: hashPassword, nikname });
      const token = generateJwt(user.id, user.email, user.nikname, user.avatar, user.countSubscribers);

      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ where: { email } });

      if (!candidate) {
        return next(ApiError.badRequest('Пользователь с таким email не существует'));
      }

      let comparePassword = bcrypt.compareSync(password, candidate.password);
      if (!comparePassword) {
        return next(ApiError.internal('Пароль неверный'));
      }

      const token = generateJwt(candidate.id, candidate.email, candidate.nikname, candidate.avatar, candidate.countSubscribers);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.nikname, req.user.avatar, req.user.countSubscribers);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      const {id} = req.params;
      const {avatar} = req.files;
      const filename = uuid.v4() + '.jpg';

      avatar.mv(path.resolve(__dirname, '..', 'static', filename));

      const user = await User.findOne({where: {id}});
      const newUser = await User.update({avatar: filename}, {where:{id}});
      const token = generateJwt(user.id, user.email, user.nikname, filename);

      return res.json({avatar: filename, token});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
