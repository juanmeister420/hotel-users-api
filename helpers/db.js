const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // Tworzenie bazy
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Połączenie
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // Inicjalizacja modeli
    db.User = require('../users/user.model')(sequelize);

    // Synchronizacja modeli
    await sequelize.sync();
}