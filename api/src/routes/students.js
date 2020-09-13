const server = require('express').Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const { Student, TypeOfDifficulty, Subject } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/', (req, res) => {
    // BUSCA TODOS LOS STUDENTS Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
    Student.findAll(
        { include: [
            {
                model: TypeOfDifficulty
            },
            {
                model: Subject
            }
        ] })
        .then(students => {
            // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "STUDENTS" ESTÁ VACÍO. ASÍ
            // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS STUDENTS DENTRO.
            !students.length ? res.json("No hay alumnos todavía.") : res.json(students)
        })
        .catch(err => {
            // ENVÍA UN ERROR EN CASO DE QUE HAYA INCONVENIENTES.
            res.json(err)
        })
})

server.post('/', (req, res) => {
    // CREA UN STUDENT.
    // RECIBE POR BODY TODA LA INFORMACIÓN DEL STUDENT.
    const student = req.body;
    Student.create(student)
        .then(studentCreated => {
            // DEVUELVE EL STUDENT CREADO.
            res.json(studentCreated)
        })
        .catch(err => {
            // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
            console.log(err)
            res.json(err)
        })
})

// BUSCA UN STUDENT EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get('/:id', (req, res) => {
    // BUSCA AL STUDENT.
    Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(studentFound => {
            // SI ENCUENTRA AL STUDENT, ENVÍA SUS DATOS. O SINO, ENVÍA UN MENSAJE DE ERROR.
            !studentFound ? res.json('El student no existe.') : res.json(studentFound)
        })
        .catch(err => {
            // SI HAY UN ERROR, LO ENVÍA.
            res.json(err)
        })
})

// MODIFICAR LA INFORMACIÓN DE UN STUDENT.
server.put('/:id', (req, res) => {
    // BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
    Student.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            Student.findOne({
                where: {
                    id: req.params.id
                }
            })
                // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
                .then(studentWithChanges => {
                    res.json(studentWithChanges)
                })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = server;