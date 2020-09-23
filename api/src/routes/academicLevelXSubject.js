const server = require("express").Router();

// TRAEMOS LAS MATERIAS DE LA BASE DE DATOS
const { AcademicLevel, academicLeveltXSubject } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

// AGREGA LAS MATERIAS DE UN ESTUDIANTE DE UN STUDENT.
server.post("/:id", (req, res) => {
    // BUSCA Y MODIFICA LA MATERIA DEL STUDENT ENCONTRADO.
    //Se espera q lo traiga en un campo 'subjectsId'
    const subjectsId = req.body.subjectsId;
    AcademicLevel.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((yearCreated) => {
        yearCreated
          .addSubject(subjectsId)
          .then(() => res.send("Materia agregada al año escolar"))
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
  
  server.delete("/:id", (req, res) => {
    //Se espera q lo traiga en un campo 'subjectsId'
    const subjectsId = req.body.subjectsId;
    academicLeveltXSubject.destroy({
      where: {
        subjectId: subjectsId,
        academicLevelId: req.params.id,
      },
    })
      .then(as => {
        res.json("Materia eliminada del año escolar");
      })
  
      .catch((err) => {
        res.json(err);
      });
  });


module.exports = server;
