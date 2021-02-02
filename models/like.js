const {DataTypes} = require('sequelize');
const db = require('../db');

const Like = db.define('like', {
    like: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Like