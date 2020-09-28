const server = require("express").Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { User, UserSchedule } = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const { isUserAdmin, isAdmin, isUserActive } = require("./middlewares.js");

server.get("/", isUserActive, isAdmin, (req, res) => {
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

//Debe ser /me con protecciones
server.get("/:id", isUserActive, isUserAdmin, (req, res) => {
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
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] }
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

//AGREGA HORARIOS AL PROFESOR
server.post("/:userId", isAdmin, (req, res) => {
  var { dias } = req.body;
  console.log(dias);
  UserSchedule.bulkCreate(
    dias.map((e) => {
      return {
        nameWeekDay: e.nameWeekDay,
        timeFrame: [e.startTime, e.endTime],
        userId: req.params.userId,
      };
    }),
    { validate: true }
  )
    .then((schedule) => res.send(schedule))
    .catch((err) => res.send(err));
});

module.exports = server;
