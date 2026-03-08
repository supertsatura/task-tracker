// db/database.js
const { Sequelize } = require('sequelize');

// Создаем экземпляр Sequelize для подключения к PostgreSQL
const sequelize = new Sequelize({
    dialect: 'postgres', // Указываем тип базы данных
    host: 'localhost',   // Адрес сервера БД (по умолчанию localhost)
    port: 5432,          // Порт PostgreSQL (по умолчанию 5432)
    database: 'task_tracker', // Имя вашей базы данных
    username: 'postgres',     // Имя пользователя
    password: '1234',   // Пароль
    logging: false,     // Отключаем вывод SQL-запросов в консоль (можно включить для отладки)
});

module.exports = sequelize;