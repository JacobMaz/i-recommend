const User = require('./user');
const Food = require('./food');

Food.belongsTo(User);
User.hasMany(Food);

module.exports = {User, Food}