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

//AGREGA HORARIOS AL PROFESOR
server.post('/:userId', (req, res) => {
    console.log(req.body)
    var dias = req.body.schedules
    UserSchedule.bulkCreate(dias)
    .then(schedule => res.send(schedule))
    .catch(err => res.send(err))
})

module.exports = server;
