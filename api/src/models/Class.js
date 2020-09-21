const Sequelize = require("sequelize");
const { DataTypes, DECIMAL } = require("sequelize");

module.exports = (sequelize) => {
  const Class = sequelize.define("class", {
    duration: {
      type: DataTypes.RANGE(DECIMAL),
      allowNull: false,
      defaultValue: new Date(),
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
