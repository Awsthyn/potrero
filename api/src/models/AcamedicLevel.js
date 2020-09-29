const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AcademicLevel = sequelize.define("academicLevel", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numericLevel: {
      type: DataTypes.INTEGER,
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
  AcademicLevel.createInstanceFromBody = function ({ name }) {
    return AcademicLevel.create({
      name    });
  };
};
