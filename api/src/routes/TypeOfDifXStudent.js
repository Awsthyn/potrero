const server = require("express").Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const { Student, TODXStudent } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize"); 

// BUSCA Y AGREGA EL TOD AL STUDENT ENCONTRADO.
server.post("/:id", (req, res) => {
  //Se espera q lo traiga en un campo 'typeOfDifficultyId'
  const todId = req.body.typeOfDifficultyId;
  Student.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((studentCreated) => {
      studentCreated
        .addTypeOfDifficulty(todId)
        .then(() => res.json("Tipo de dificultad agregada"))
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

//Elimina el TOD del alumno
server.delete("/:id", (req, res) => {
  //Se espera q lo traiga en un campo 'typeOfDifficultyId'
  const todId = req.body.typeOfDifficultyId;
  TODXStudent.destroy({
    where: {
      studentId: req.params.id,
      typeOfDifficultyId: todId,
    },
  })
    .then(() => {
      res.json("Tipo de dificultad eliminado del alumno");
    })

    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
