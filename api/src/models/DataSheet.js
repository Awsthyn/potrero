const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const DataSheet = sequelize.define("dataSheet", {
    concentration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
    },
    assistance: {
      type: DataTypes.ENUM("ausente", "tardanza", "presente"),
      allowNull: false,
    },
    internetConnection: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
    },
    performance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
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
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
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