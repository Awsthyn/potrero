const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { StudentSchedule, Student } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/:idStudent', (req, res) => {
    Student.findOne({
        where:
        {
            idStudent: req.params.id
        },
        include:
            [
                {
                    model: StudentSchedule
                }
            ]
    })
        .then(studentWithTheirSchedules => {
            !studentWithTheirSchedules ? res.json("El alumno que busca no existe.") : res.json(studentWithTheirSchedules)
        })
        .catch(err => {
            res.json(err)
        })
})

server.post('/time/:idStudent', (req, res) => {
    console.log("HOLA")
    console.log(req.body)
    console.log(req.params)
    const newSchedule = req.body;
    Student.findOne({
        where:
        {
            id: req.params.idStudent
        }
    })
        .then(student => {
            console.log("chau")
            console.log(student)
            console.log("chau2")
            !student ? res.json("El alumno que busca no existe.") : res.json(student)
            // StudentSchedule.create(newSchedule)
    // .then( studentWithTheirSchedules => {
    //    !studentWithTheirSchedules ? res.json("El alumno que busca no existe.") : res.json( studentWithTheirSchedules )
    // })
    // .catch( err => {
    //     res.json( err )
    // })

        })
        .catch(err => {
            res.json(err)
        })


})


module.exports = server;