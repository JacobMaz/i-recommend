const {DataTypes} = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Item