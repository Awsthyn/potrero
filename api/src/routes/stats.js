const server = require("express").Router();
const {
  Class,
  DataSheet,
  Subject,
  User,
  Student,
  AcademicLevel,
  EducationLevel,
} = require("../db.js");

server.get("/assistances", (req, res) => {
  DataSheet.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((allClasses) => {
      let countAssistance = [];
      let countInassistance = [];
      let countDelay = [];
      // res.json(allClasses)
      allClasses.forEach((element) => {
        if (element.assistance === "presente") {
          countAssistance.push(element.assistance);
        } else if (element.assistance === "ausente") {
          countInassistance.push(element.assistance);
        } else if (element.assistance === "tardanza") {
          countDelay.push(element.assistance);
        }
      });
      let countTotalAssistance = {
        assistance: countAssistance.length,
        inassistance: countInassistance.length,
        delay: countDelay.length,
        total:
          countAssistance.length + countInassistance.length + countDelay.length,
      };
      res.json(countTotalAssistance);
    })
    .catch((err) => {
      console.log(err);
    });
});

//A futuro
server.get("/assistances/:id", (req, res) => {
  Student.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Class,
        include: [
          {
            model: DataSheet,
          },
          {
            model: Subject,
          },
        ],
      },
    ],
  })
    .then((allDataSheetFromUser) => {
      let assistanceFromUser = [];
      let presenteFromUser = [];
      let tardanzaFromUser = [];
      let ausenteFromUser = [];

      allDataSheetFromUser.classes.forEach((element) => {
        assistanceFromUser.push(element.dataSheet.assistance);
      });

      assistanceFromUser.forEach((assistence) => {
        if (assistence === "presente") {
          presenteFromUser.push(assistence);
        } else if (assistence === "ausente") {
          ausenteFromUser.push(assistence);
        } else if (assistence === "tardanza") {
          tardanzaFromUser.push(assistence);
        }
      });

      let recorrerAsisstances = {
        presente: presenteFromUser.length,
        tardanza: tardanzaFromUser.length,
        ausente: ausenteFromUser.length,
        total:
          presenteFromUser.length +
          tardanzaFromUser.length +
          ausenteFromUser.length,
      };

      res.json(recorrerAsisstances);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/qualification", (req, res) => {
  DataSheet.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((allClasses) => {
      // console.log(allClasses)
      let countQualification = [5, 3, 1, 9, 10, 7];
      // res.json(allClasses)
      allClasses.forEach((element) => {
        if (element.hadExam === true) {
          var num = parseInt(element.qualification);
          countQualification.push(num);
        }
      });
      console.log(countQualification);
      res.json(countQualification);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/qualification/alumno", (req, res) => {
  Class.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Student,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: DataSheet,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  })
    .then((allClasses) => {
      res.json(allClasses);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
