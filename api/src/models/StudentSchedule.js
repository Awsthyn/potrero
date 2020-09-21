const Sequelize = require("sequelize");
const { DataTypes, DECIMAL } = require("sequelize");

module.exports = (sequelize) => {
  const StudentSchedule = sequelize.define("studentSchedule", {
    timeFrame: {
      type: DataTypes.RANGE(DECIMAL),
      allowNull: false,
    },
    nameWeekDay: {
      type: DataTypes.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });

  StudentSchedule.createInstanceFromBody = function ({
    startTime,
    endTime,
    nameWeekDay,
  }) {
    return StudentSchedule.create({
      startTime,
      endTime,
      nameWeekDay,
      studentId,
    });
  };
};
