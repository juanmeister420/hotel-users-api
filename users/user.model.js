const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // hashowanie 
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // hashowanie
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}