const sequelize = require('./database.js');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно установлено.');
    }
    catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
}

testConnection();