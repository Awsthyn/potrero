const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const StudentSchedule = sequelize.define('studentSchedule', {
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        nameWeekDay: {
            type: DataTypes.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes"),
            allowNull: false
        }
    })
}