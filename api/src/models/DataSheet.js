const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DataSheet = sequelize.define('dataSheet', {
        concentration: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
            allowNull: false
        },
        internetConnection: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
            allowNull: false
        },
        performance: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
            allowNull: false
        },
        someoneAccompaniesHim: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        companionName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        hadExam: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        qualification: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
            allowNull: true
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    DataSheet.createInstanceFromBody = function ({ concentration, internetConnection, performance, someoneAccompaniesHim, companionName, comments, hadExam, qualification, duration }) {
        return DataSheet.create({
            concentration,
            internetConnection,
            performance,
            someoneAccompaniesHim,
            companionName,
            comments,
            hadExam,
            qualification,
            duration
        });
    };
};