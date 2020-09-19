const server = require("express").Router();

// TRAEMOS LAS MATERIAS DE LA BASE DE DATOS
const { EducationLevel, AcademicLevel } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

//LISTA LAS MATERIAS POR AÑO
server.get("/", (req, res) => {
    EducationLevel.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: AcademicLevel,
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
  EducationLevel.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: AcademicLevel,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  })
    .then((materiaFound) => {
      // SI ENCUENTRA LA MATERIA, LO ENVÍA. SINO, ENVÍA UN MENSAJE DE ERROR.
      !materiaFound
        ? res.json("Nivel educativo no existente.")
        : res.json(materiaFound);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREA UN NIVEL DE EDUCACIÓN - PRIMARIO - SECUNDARIO
server.post("/", (req, res) => {
  // RECIBE LOS DATOS DEL GRADO POR BODY
  const nivel = req.body;
  EducationLevel.createInstanceFromBody(nivel)
    .then((levelCreated) => {
      // NIVEL CREADO
      res.json(levelCreated);
    })
    .catch((err) => {
      // SI HAY UN ERROR, LO DEVUELVE. POR SI FALTÓ UN CAMPO POR COMPLETAR O MISMO LOS DATOS NO SON VÁLIDOS.
      res.json(err);
    });
});

// BUSCA UNA NIVEL DE EDUCACIÓN Y MODIFICA LA INFORMACIÓN QUE LE HAYAN ENVIADO POR BODY
server.put("/:id", (req, res) => {
  // BUSCA Y MODIFICA LA MATERIA ENCONTRADA.
  EducationLevel.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
    .then(() => {
        EducationLevel.findOne({
        where: {
          id: req.params.id,
        },
      }).then((levelWithChanges) => {
        res.json(levelWithChanges);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//ELIMINA EL NIVEL DE EDUCACIÓN
server.delete("/:id", (req, res, next) => {
    //ENCUENTRA LA MATERIA POR ID Y LA DESTRUYE
    EducationLevel.destroy({
      where: {
        id: req.params.id,
      },
    })
      //UNA VEZ ELIMINADO DEVUELVE UN MENSAJE
      .then(() => {
        res.status(200);
        res.json("Nivel de educación eliminada");
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = server;
