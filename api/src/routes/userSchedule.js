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

server.post('/', (req, res) => {
    var dias = req.body.schedules.split("-");
    var numero = 1;
    var obj = {};
        for (let i = 0; i < dias.length; i++) {
        if (numero === 1) {
            obj.startTime = dias[i];
            numero = numero + 1;
        } else if (numero === 2) {
            obj.endTime = dias[i];
            numero = numero + 1;
        } else if (numero === 3) {
            obj.nameWeekDay = dias[i];
            obj.studentId = sc.id;
            UserSchedule.create(obj);
            numero = 1;
        }
    }
})

module.exports = server;