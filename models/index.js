const User = require('./user');
const Food = require('./food');
const Like = require('./like');

Like.belongsTo(User);
Like.belongsTo(Food);
User.hasMany(Like);
Food.hasMany(Like);

module.exports = {User, Food, Like}