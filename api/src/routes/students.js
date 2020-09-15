const server = require('express').Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const { Student, TypeOfDifficulty, Subject, TODXStudent, SubjectXStudent } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/', (req, res) => {
    // BUSCA TODOS LOS STUDENTS Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
    Student.findAll(
        { 
            include: [
            {
                model: TypeOfDifficulty
            },
            {
                model: Subject
            }]
        })
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
    let sc = null;
    Student.create(student)
    .then(studentCreated => {
        sc = studentCreated;
        // Se espera un arreglo con Id's de Subjects
        req.body.subjectsId.forEach(idSub => {
            studentCreated.addSubject(idSub)
            .then(() => console.log('Ok1'))
        });
        req.body.TODId.forEach(idTOD => {
            studentCreated.addTypeOfDifficulty(idTOD)
            .then(() => console.log('Ok2'))
        })
    })
    .then(() => {
        // DEVUELVE EL STUDENT CREADO.
        res.json('Usuario creado exitosamente')
    })
    .catch(err => {
        // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
        console.log(err)
        res.json(err)
    })
});

// BUSCA UN STUDENT EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get('/:id', (req, res) => {
    // BUSCA AL STUDENT.

    Student.findOne(
        {
            where: 
            {
                id: req.params.id
            },
            include: 
            [
                {
                    model: TypeOfDifficulty
                },
                {
                    model: Subject
                }
            ]
        }
        )
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
server.put('/tod/:id', (req, res) => {
    // BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
    TODXStudent.update(req.body, {
        where: {
            studentId: req.params.id
        }
    })
    .then(() => {
        Student.findOne({
            where: {
                id: req.params.id
            },
            include: 
            [
                {
                    model: TypeOfDifficulty
                }
            ]
        })
        // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
        .then(studentWithChanges => {
            res.json(studentWithChanges)
        })
    })
    .catch(err => {
        res.json(err)
    })
});

server.put('/subject/:id', (req, res) => {
    // BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
    SubjectXStudent.update(req.body, {
        where: {
            studentId: req.params.id
        }
    })
    .then(() => {
        Student.findOne({
            where: {
                id: req.params.id
            },
            include: 
            [
                {
                    model: Subject
                }
            ]
        })
        // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
        .then(studentWithChanges => {
            res.json(studentWithChanges)
        })
    })
    .catch(err => {
        res.json(err)
    })
});

// En lugar de eliminar un estudiante lo que hacemos es cambiarle el status a false
// Y así poder filtrar solamente por estudiantes activos y no perder la info por si
// mas adelante vulelve a la fundación.
server.put('/:id', (req, res) => {
    const {subjectsId} = req.body
    // BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
    SubjectXStudent.destroy({ where: { studentId: req.params.id } })
    .then(() => SubjectXStudent.bulkCreate(subjectsId.map(s => {return {subjectId: s, studentId: req.params.id}})))
    .then(() => Student.update(req.body, {where: {id: req.params.id}}))
    .then(() => {
        Student.findOne({
            where: {
                id: req.params.id
            },
            include: 
            [
                {
                    model: TypeOfDifficulty
                },
                {
                    model: Subject
                }
            ]
        })
        // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
        .then(studentWithChanges => {
            res.json(studentWithChanges)
        })
    })
    .catch(err => {
        res.json(err)
    })
});


server.put('/:id/changestatus', (req, res)=>{
    Student.update({isActive: req.body.isActive},{where: {id: req.params.id}})
    .then(() => {
        Student.findOne({
            where: {
                id: req.params.id
            },
            include: 
            [
                {
                    model: TypeOfDifficulty
                },
                {
                    model: Subject
                }
            ]
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