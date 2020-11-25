const {DataTypes} = require('sequelize');
const db = require('../db');

const Food = db.define('food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foodOne: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foodTwo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foodThree: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Food;