const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Subject = sequelize.define('subject', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
    });
    Subject.createInstanceFromBody = function ({ name }) {
        return Subject.create({
            name
        });
    };
};