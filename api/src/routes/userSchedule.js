const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { UserSchedule } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/', (req, res) => {
    UserSchedule.findAll({
        where: {
            include:[{
                model: User,
                include: Student
            }]
        }
    })
    .then( allSchedulesOfUsers => {
        res.json( allSchedulesOfUsers )
    })
    .catch( err => {
        res.json( err )
    })
})

module.exports = server;