const server = require("express").Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { Student, StudentSchedule } = require("../db.js");

const isAdmin = require("./middlewares.js").isAdmin;
// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

server.get("/", isAdmin, (req, res) => {
  Student.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "phone",
        "email",
        "tutor",
        "difficulty",
        "weakness",
        "strengths",
        "interests",
        "motivations",
        "isActive",
      ],
    },
    include: [
      {
        model: StudentSchedule,
        attributes: { exclude: ["createdAt", "updatedAt", "studentId"] },
      },
    ],
  })
    .then((allSchedulesOfUsers) => {
      res.json(allSchedulesOfUsers);
    })
    .catch((err) => {
      res.json(err);
    });
});

server.get("/:id", isAdmin, (req, res) => {
  Student.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "phone",
        "email",
        "tutor",
        "difficulty",
        "weakness",
        "strengths",
        "interests",
        "motivations",
        "isActive",
      ],
    },
    include: [
      {
        model: StudentSchedule,
        attributes: { exclude: ["createdAt", "updatedAt", "studentId"] },
      },
    ],
  })
    .then((studentWithTheirSchedules) => {
      !studentWithTheirSchedules
        ? res.json("El alumno que busca no existe.")
        : res.json(studentWithTheirSchedules);
    })
    .catch((err) => {
      res.json(err);
    });
});

server.post("/:id", isAdmin, (req, res) => {
  //Se espera una propiedad 'schedules'
  var dias = req.body.schedules.split("-");
  console.log(req.body);
  console.log(dias);
  var numero = 1;
  var obj = {};
  for (let i = 0; i < dias.length; i++) {
    if (numero === 1) {
      obj.startTime = dias[i];
      numero = numero + 1;
    } else if (numero === 2) {
      obj.endTime = dias[i];
      numero = numero + 1;
    } else if (numero === 3) {
      obj.nameWeekDay = dias[i];
      obj.studentId = req.params.id;
      console.log(obj);
      numero = 1;
      StudentSchedule.create(obj)
        .then((reso) => res.json(reso))
        //   .then(() => res.json("Horario agregado"))
        .catch((err) => {
          res.send(err);
        });
    }
  }
});

server.delete("/:id", isAdmin, (req, res) => {
  //Se espera q lo traiga en un campo 'subjectsId'
  var dias = req.body.schedules.split("-");
  var numero = 1;
  var obj = {};
  for (let i = 0; i < dias.length; i++) {
    if (numero === 1) {
      obj.startTime = dias[i];
      numero = numero + 1;
    } else if (numero === 2) {
      obj.endTime = dias[i];
      numero = numero + 1;
    } else if (numero === 3) {
      obj.nameWeekDay = dias[i];
      obj.studentId = req.params.id;
      console.log(obj);
      numero = 1;
      StudentSchedule.destroy({
        where: obj,
      })
        .then(() => res.json("Horario elimiado"))
        .catch((err) => {
          res.json(err);
        });
    }
  }
});

module.exports = server;
