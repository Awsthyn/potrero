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

//AGREGA HORARIOS AL PROFESOR
server.post('/:userId', (req, res) => {
    var dias = req.body.schedules
    UserSchedule.bulkCreate(dias, {validate: true})
    .then(schedule => res.send(schedule))
    .catch(err => res.send(err))
})

module.exports = server;