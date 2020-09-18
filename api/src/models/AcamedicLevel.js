const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AcademicLevel = sequelize.define('academicLevel', {
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
    AcademicLevel.createInstanceFromBody = function ({ name, educationLevelId}) {
        return AcademicLevel.create({
            name,
            educationLevelId
        });
    };
};