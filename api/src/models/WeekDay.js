const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Day = sequelize.define('day', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}