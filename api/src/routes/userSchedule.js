const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { UserSchedule } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

module.exports = server;