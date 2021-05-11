const User = require('./user');
const Food = require('./food');
const Like = require('./like');

User.belongsToMany(User, {as: 'User', foreignKey:'followingId', through: 'follow'});
User.belongsToMany(User, {as: 'followed', foreignKey: 'followId', through: 'follow'});
Like.belongsTo(User);
Like.belongsTo(Food);
User.hasMany(Like);
Food.hasMany(Like);

module.exports = {User, Food, Like}