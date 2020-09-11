const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Subject = sequelize.define('subject', {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        }
    });
    Subject.createInstanceFromBody = function ({ name }) {
        return Subject.create({
            name
        });
    };
};