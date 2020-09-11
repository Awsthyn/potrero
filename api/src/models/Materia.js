const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Materia = sequelize.define("materia", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });
};
