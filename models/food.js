const {DataTypes} = require('sequelize');
const db = require('../db');

const Food = db.define('food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Food;