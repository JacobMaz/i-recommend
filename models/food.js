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
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    menu: {
        type: DataTypes.STRING,
        allowNull: true
    },
    priceRange: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Food;