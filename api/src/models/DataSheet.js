const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const DataSheet = sequelize.define("dataSheet", {
    concentration: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
      allowNull: true,
    },
    assistance: {
      type: DataTypes.ENUM("ausente", "tardanza", "presente"),
      allowNull: false,
    },
    internetConnection: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
      allowNull: true,
    },
    performance: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
      allowNull: true,
    },
    someoneAccompaniesHim: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    companionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hadExam: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    qualification: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attitude: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
      allowNull: true,
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
  DataSheet.createInstanceFromBody = function ({
    concentration,
    assistance,
    internetConnection,
    performance,
    someoneAccompaniesHim,
    companionName,
    comments,
    hadExam,
    qualification,
    duration,
    attitude,
  }) {
    return DataSheet.create({
      concentration,
      assistance,
      internetConnection,
      performance,
      someoneAccompaniesHim,
      companionName,
      comments,
      hadExam,
      qualification,
      duration,
      attitude,
    });
  };
};
