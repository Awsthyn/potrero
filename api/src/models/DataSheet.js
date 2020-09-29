const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const DataSheet = sequelize.define("dataSheet", {
    relation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    difference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    valued: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    assesorMotivation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      },
    },
    assistance: {
      type: DataTypes.ENUM("justificada", "no justificada", "tardanza", "presente"),
      allowNull: false,
    },
    internetConnection: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      },
    },
    performance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      },
    },
    stay: {
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      },
    },
    attitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
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