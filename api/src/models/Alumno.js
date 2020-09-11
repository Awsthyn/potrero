var Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('alumno', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    progenitor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultadAprendizaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debilidades: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fortalezas: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    intereses: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    motivacion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nivelEducativo: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["inicial", "primaria", "secundaria", "otro"]],
      },
    },
  });
};
