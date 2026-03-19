const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'task_tracker',
    username: 'postgres',
    password: '1234',
    logging: false,
});

module.exports = sequelize;