const server = require("express").Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const { User, SubjectXUser } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

// AGREGA LAS MATERIAS DE UN ESTUDIANTE DE UN STUDENT.
server.post("/subject/:id", (req, res) => {
  // BUSCA Y MODIFICA LA MATERIA DEL STUDENT ENCONTRADO.
  //Se espera q lo traiga en un campo 'subjectsId'
  const subjectsId = req.body.subjectsId;
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((userCreated) => {
      userCreated
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
  SubjectXUser.destroy({
    where: {
      subjectId: subjectsId,
      userId: req.params.id,
    },
  })
    .then(() => {
      res.json("Materia eliminada");
    })

    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
