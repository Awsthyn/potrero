const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define('role', {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        }
    });
    Role.createInstanceFromBody = function ({ name }) {
        return Role.create({
        name
        });
    };
};