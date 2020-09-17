const server = require("express").Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const { Student, SubjectXStudent } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

// AGREGA LAS MATERIAS DE UN ESTUDIANTE DE UN STUDENT.
server.post("/subject/:id", (req, res) => {
  // BUSCA Y MODIFICA LA MATERIA DEL STUDENT ENCONTRADO.
  //Se espera q lo traiga en un campo 'subjectsId'
  const subjectsId = req.body.subjectsId;
  Student.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((studentCreated) => {
      studentCreated
        .addSubject(subjectsId)
        .then(() => res.send("Materia agregada"))
        .catch((err) => {
          // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
          console.log(err);
          res.json(err);
        });
    })

    .catch((err) => {
      res.json(err);
    });
});

server.delete("/subject/:id", (req, res) => {
  //Se espera q lo traiga en un campo 'subjectsId'
  const subjectsId = req.body.subjectsId;
  SubjectXStudent.destroy({
    where: {
      subjectId: subjectsId,
      studentId: req.params.id,
    },
  })
    .then(() => {
      res.json("Materia eliminada del alumno");
    })

    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
