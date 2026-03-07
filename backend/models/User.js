const {DataTypes} = require('sequelize');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
            isAlpha: true,
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
            isAlpha: true,
        }
    },
    patronymic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
            isAlpha: true,
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0,
            max: 100,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            unique: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 20],
            isAlphanumeric: true,
        }
    }
}, {
    underscored: true,
})

module.exports = User;