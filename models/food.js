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
    },
    foodFour: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foodFive: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Food;