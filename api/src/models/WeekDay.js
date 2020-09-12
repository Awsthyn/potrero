const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const WeekDay = sequelize.define('weekday', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}