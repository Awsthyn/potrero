const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Class = sequelize.define('class', {
        dataSheetId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    Class.createInstanceFromBody = function ({ userId, studentId, subjectId }) {
        return Class.create({
            userId,
            studentId,
            subjectId,
        });
    }
};