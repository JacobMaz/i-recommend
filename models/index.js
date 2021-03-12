const User = require('./user');
const Food = require('./food');
const Like = require('./like');
const Item = require('./item');

Food.belongsTo(User);
Like.belongsTo(User);
Like.belongsTo(Food);
Item.belongsTo(User);
Item.belongsTo(Food);
User.hasMany(Food);
User.hasMany(Like);
User.hasMany(Item);
Food.hasMany(Like);
Food.hasMany(Item)

module.exports = {User, Food, Like, Item}