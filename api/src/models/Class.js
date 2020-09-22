const Sequelize = require("sequelize");
const { DataTypes, DECIMAL } = require("sequelize");

module.exports = (sequelize) => {
  const Class = sequelize.define("class", {
    duration: {
      type: DataTypes.RANGE(DECIMAL),
      allowNull: false,
    },
    nameWeekDay: {
      type: DataTypes.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  });
};
