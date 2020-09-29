const server = require("express").Router();

// TRAEMOS LAS MATERIAS DE LA BASE DE DATOS 
const { AcademicLevel, Subject, EducationLevel } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

//LISTA LAS MATERIAS POR AÑO
server.get("/", (req, res) => {
  AcademicLevel.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Subject,
        attributes: {
          exclude: ["createdAt", "updatedAt", "academicLeveltXSubject"],
        },
      },
    ],
  })
    .then((year) => {
      // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "ACADEMIC YEAR" ESTÁ VACÍO. ASÍ
      // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LAS MATERIAS DENTRO.
      !year.length ? res.json("Información no disponible.") : res.json(year);
    })
    .catch((err) => {
      res.json(err);
    });
});

// BUSCA UNA GRADO EN ESPECÍFICO Y MUESTRA SUS DATOS.
server.get("/:id", (req, res) => {
  // ACÁ BUSCA UNA MATERIA EN LA BASE DE DATOS
  AcademicLevel.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Subject,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  })
    .then((materiaFound) => {
      // SI ENCUENTRA LA MATERIA, LO ENVÍA. SINO, ENVÍA UN MENSAJE DE ERROR.
      !materiaFound
        ? res.json("La materia no existe.")
        : res.json(materiaFound);
    })
    .catch((err) => {
      res.json(err);
    });
});


// CREA UNA GRADO
server.post("/", (req, res) => {
  // RECIBE LOS DATOS DEL GRADO POR BODY
  const materia = req.body;
  AcademicLevel.createInstanceFromBody(materia)
    .then((yearCreated) => {
      // MATERIA CREADA
      res.json(yearCreated);
    })
    .catch((err) => {
      // SI HAY UN ERROR, LO DEVUELVE. POR SI FALTÓ UN CAMPO POR COMPLETAR O MISMO LOS DATOS NO SON VÁLIDOS.
      res.json(err);
    });
});

// BUSCA UNA GRADO Y MODIFICA LA INFORMACIÓN QUE LE HAYAN ENVIADO POR BODY
server.put("/:id", (req, res) => {
  // BUSCA Y MODIFICA LA MATERIA ENCONTRADA.
  AcademicLevel.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
    .then(() => {
      AcademicLevel.findOne({
        where: {
          id: req.params.id,
        },
      }).then((yearWithChanges) => {
        res.json(yearWithChanges);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
