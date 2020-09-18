const server = require("express").Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { User, UserSchedule } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

server.get("/", (req, res) => {
  User.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "password",
        "email",
        "address",
        "birthday",
        "phone",
        "linkedin",
        "cv",
        "state",
        "isActive",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    include: [
      {
        model: UserSchedule,
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
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

server.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "password",
        "email",
        "address",
        "birthday",
        "phone",
        "linkedin",
        "cv",
        "state",
        "isActive",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    include: [
      {
        model: UserSchedule,
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
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

server.post("/:id", (req, res) => {
  //Se espera una propiedad 'schedules'
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
      obj.userId = req.params.id;
      console.log(obj);
      numero = 1;
      UserSchedule.create(obj)
        .then(() => res.json("Horario agregado"))
        .catch((err) => {
          res.json(err);
        });
    }
  }
});

<<<<<<< HEAD
//AGREGA HORARIOS AL PROFESOR
server.post('/:userId', (req, res) => {
    var dias = req.body.schedules
    UserSchedule.bulkCreate(dias, {validate: true})
    .then(schedule => res.send(schedule))
    .catch(err => res.send(err))
})
=======
server.delete("/:id", (req, res) => {
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
      obj.userId = req.params.id;
      console.log(obj);
      numero = 1;
      UserSchedule.destroy({
        where: obj,
      })
        .then(() => res.json("Horario elimiado"))
        .catch((err) => {
          res.json(err);
        });
    }
  }
});
>>>>>>> master

module.exports = server;
