const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { StudentSchedule, Student } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/:idStudent', (req, res) => {
    Student.findOne({
        where: {
            include: [{
                model: StudentSchedule
                }
            ]
        }
    })
    .then( studentWithTheirSchedules => {
       !studentWithTheirSchedules ? res.json("El alumno que busca no existe.") : res.json( studentWithTheirSchedules )
    })
    .catch( err => {
        res.json( err )
    })
})

module.exports = server;