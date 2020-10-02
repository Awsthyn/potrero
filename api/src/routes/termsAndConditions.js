const server = require("express").Router();
const nodemailer = require("nodemailer");
const { Student } = require("../db.js");

server.post("/email", function (req, res) {
  /*Student.findOne({where: {email : req.body.email} or:[{tutorEmail: req.body.tutorEmail}]})
    .then(volunteer =>{*/
  const email = req.body.email;
  const state = req.body.state;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fundacionelpotrero1@gmail.com",
      pass: "Henryelpotrero",
    },
  });
  //Adjunto pdf con los términos y condiciones de la fundación
  if (state === "tutor") {
    var mailOptions = {
      from: "El Potrero",
      to: email,
      subject: "Términos y condiciones. Fundación El Potrero",
      attachments: [
        {
          filename: "file.pdf",
          path: __dirname + "/uploads/CONSENTIMIENTOINFORMADO.pdf",
          contentType: "application/pdf",
        },
      ],
      function(err, info) {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send(info);
        }
      },
    };
  } else {
    var mailOptions = {
      from: "El Potrero",
      to: email,
      subject: "Términos y condiciones. Fundación El Potrero",
      attachments: [
        {
          filename: "file.pdf",
          path: __dirname + "/uploads/CONSENTIMIENTOALUMNOS.pdf",
          contentType: "application/pdf",
        },
      ],
      function(err, info) {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send(info);
        }
      },
    };
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("reset enviado");
      res.status(200).jsonp(req.body);
    }
  });
});

module.exports = server;
