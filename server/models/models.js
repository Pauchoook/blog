const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  nikname: { type: DataTypes.STRING, unique: true },
  avatar: { type: DataTypes.STRING },
  countSubscribers: { type: DataTypes.INTEGER, defaultValue: 0 },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  years: { type: DataTypes.INTEGER },
  profession: { type: DataTypes.STRING, defaultValue: 'Читатель' },
  about: { type: DataTypes.STRING },
  countOwners: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Post = sequelize.define('post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  countLikes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  comment: { type: DataTypes.STRING, allowNull: false },
  countLikes: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Like = sequelize.define('like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Subscriber = sequelize.define('subscriber', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ownerId: { type: DataTypes.INTEGER },
});

const Owner = sequelize.define('owner', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subscriberId: { type: DataTypes.INTEGER },
});

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

User.hasMany(Post);
Post.belongsTo(User, {onDelete: 'cascade'});

User.hasMany(Comment);
Comment.belongsTo(User, {onDelete: 'cascade'});

User.hasMany(Like);
Like.belongsTo(User, {onDelete: 'cascade'});

User.hasMany(Subscriber);
Subscriber.belongsTo(User);

User.hasMany(Owner);
Owner.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post, {onDelete: 'cascade'});

Post.hasMany(Like);
Like.belongsTo(Post, {onDelete: 'cascade'});

Comment.hasMany(Like);
Like.belongsTo(Comment, {onDelete: 'cascade'});

Type.hasMany(Post);
Post.belongsTo(Type);

module.exports = {
  User,
  Post,
  Like,
  Comment,
  Subscriber,
  Owner,
  Type
};
