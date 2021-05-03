const {DataTypes} = require('sequelize');
const db = require('../db');

const Like = db.define('like', {
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
})

module.exports = Like