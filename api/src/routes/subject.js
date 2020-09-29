const server = require("express").Router();

// TRAEMOS LAS MATERIAS DE LA BASE DE DATOS
const { Subject, AcademicLevel, EducationLevel } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

//SOLO LISTA LAS MATERIAS
server.get("/", (req, res) => {
  Subject.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: AcademicLevel,
        attributes: {
          exclude: ["createdAt", "updatedAt", "educationLevelId"],
        },
        include: [
          {
            model: EducationLevel,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  })
    .then((materia) => {
      // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "SUBJECT" ESTÁ VACÍO. ASÍ
      // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LAS MATERIAS DENTRO.
      !materia.length
        ? res.json("No hay materias disponibles.")
        : res.json(materia);
    })
    .catch((err) => {
      res.json(err);
    });
});

// BUSCA UNA MATERIA EN ESPECÍFICO Y MUESTRA SUS DATOS.
server.get("/:id", (req, res) => {
  // ACÁ BUSCA UNA MATERIA EN LA BASE DE DATOS
  Subject.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: AcademicLevel,
        attributes: {
          exclude: ["createdAt", "updatedAt", "educationLevelId"],
        },
        include: [
          {
            model: EducationLevel,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
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

// CREA UNA MATERIA
server.post("/", (req, res) => {
  // RECIBE LOS DATOS DE LA MATERIA POR BODY
  const materia = req.body;
  Subject.createInstanceFromBody(materia)
    .then((materiaCreated) => {
      // MATERIA CREADA
      res.json(materiaCreated);
    })
    .catch((err) => {
      // SI HAY UN ERROR, LO DEVUELVE. POR SI FALTÓ UN CAMPO POR COMPLETAR O MISMO LOS DATOS NO SON VÁLIDOS.
      res.json(err);
    });
});

// BUSCA UNA MATERIA Y MODIFICA LA INFORMACIÓN QUE LE HAYAN ENVIADO POR BODY
server.put("/:id", (req, res) => {
  // BUSCA Y MODIFICA LA MATERIA ENCONTRADA.
  Subject.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
    .then(() => {
      Subject.findOne({
        where: {
          id: req.params.id,
        },
      }).then((subjectWithChanges) => {
        res.json(subjectWithChanges);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//ELIMINA LA MATERIA
server.delete("/:id", (req, res, next) => {
  //ENCUENTRA LA MATERIA POR ID Y LA DESTRUYE
  Subject.destroy({
    where: {
      id: req.params.id,
    },
  })
    //UNA VEZ ELIMINADO DEVUELVE UN MENSAJE
    .then(() => {
      res.status(200);
      res.json("Materia eliminada");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
