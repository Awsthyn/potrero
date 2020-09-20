const server = require("express").Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { TypeOfDifficulty } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");
const { isUserActive, isAdmin } = require("./middlewares.js");

server.get("/", isUserActive, (req, res) => {
  TypeOfDifficulty.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((tod) => {
      // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "TYPEOFDIFFICULTY" ESTÁ VACÍO. ASÍ
      // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS USUARIOS DENTRO.
      !tod.length
        ? res.json("No hay tipos de dificultades disponibles.")
        : res.json(tod);
    })
    .catch((err) => {
      res.json(err);
    });
});

// BUSCA UN TOD EN ESPECÍFICO Y MUESTRA SUS DATOS.
server.get("/:id", isUserActive,  (req, res) => {
  // ACÁ BUSCA UN USUARIO EN LA BASE DE DATOS
  TypeOfDifficulty.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
  })
    .then((todFound) => {
      // SI ENCUENTRA AL USUARIO, LO ENVÍA. SINO, ENVÍA UN MENSAJE DE ERROR.
      !todFound ? res.json("La dificultad no existe.") : res.json(todFound);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREA UNA DIFICULTAD
server.post("/", isAdmin, (req, res) => {
  // RECIBE LOS DATOS DEL USUARIO POR BODY
  const tod = req.body;
  TypeOfDifficulty.createInstanceFromBody(tod)
    .then((todCreated) => {
      // USUARIO CREADO
      res.json(todCreated);
    })
    .catch((err) => {
      // SI HAY UN ERROR, LO DEVUELVE. POR SI FALTÓ UN CAMPO POR COMPLETAR O MISMO LOS DATOS NO SON VÁLIDOS.
      res.json(err);
    });
});

// BUSCA UN TOD Y MODIFICA LA INFORMACIÓN QUE LE HAYAN ENVIADO POR BODY
server.put("/:id", (req, res) => {
  // BUSCA Y MODIFICA AL USUARIO ENCONTRADO.
  TypeOfDifficulty.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
    .then(() => {
      TypeOfDifficulty.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then((todWithChanges) => {
          res.json(todWithChanges);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

//ELIMINA EL TIPO DE DIFICULTAD
server.delete("/:id", isAdmin, (req, res, next) => {
  //Busca TOD por id y la destruye
  TypeOfDifficulty.destroy({
    where: {
      id: req.params.id,
    },
  })
    //UNA VEZ ELIMINADO DEVUELVE UN MENSAJE
    .then(() => {
      res.status(200);
      res.send("Type of Difficulty eliminado");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
