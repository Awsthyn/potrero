const server = require("express").Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const { User, SubjectXUser, Subject } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

// RELACIONA LAS MATERIAS CON USUARIOS
server.post("/:id/subjects", (req, res) => {
  var id = req.params.id;
  var materias = req.body.subjects;
  var user = User.findByPk(id);

  materias.map((m, i) => {
    var subject = Subject.findOne({
      where: {
        name: m,
      },
    });
    Promise.all([user, subject])
      .then((values) => {
        var user = values[0];
        var subject = values[1];
        user.addSubject(subject);
        if (i === materias.length - 1) res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

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
