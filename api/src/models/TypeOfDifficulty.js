const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TypeOfDifficulty = sequelize.define("typeOfDifficulty", {
    name: {
      type: DataTypes.STRING,
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
  TypeOfDifficulty.createInstanceFromBody = function ({ name }) {
    return TypeOfDifficulty.create({
      name,
    });
  };
};
