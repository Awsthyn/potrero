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
  Class.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Student,
      },
      {
        model: DataSheet,
      },
    ],
  })
    .then((allClasses) => {
      let countQualification = [];

      allClasses.forEach((element) => {
        if (element.dataSheet.hadExam == true) {
          let num = parseInt(element.dataSheet.qualification);
          countQualification.push(num);
        }
      });
      res.json(countQualification);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/offer/subject", (req, res) => {
  Subject.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "email",
            "password",
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
      },
    ],
  })
    .then((allSubjectsWithOffer) => {
      let objectSubjects = {
        onlyDemandOffert: [],
        nameSubjectsOffert: [],
        offertSubjects: 0,
        subjectHasOffert: false,
      };
      allSubjectsWithOffer.forEach((subject) => {
        objectSubjects.nameSubjectsOffert.push(subject);
        objectSubjects.offertSubjects =
          objectSubjects.offertSubjects + subject.users.length;
        objectSubjects.subjectHasOffert = true;
      });
      objectSubjects.nameSubjectsOffert.forEach((oneSubjectOffert) => {
        objectSubjects.onlyDemandOffert.push({
          [oneSubjectOffert.name]: oneSubjectOffert.users.length,
        });
      });
      res.json(objectSubjects);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/demand/subject", (req, res) => {
  Subject.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Student,
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
      },
    ],
  })
    .then((allSubjectsWithDemand) => {
      // LA PRIMER
      let objectSubjectsDemand = {
        onlyDemand: [],
        nameSubjectsDemand: [],
        demandSubjects: 0,
        subjectHasDemand: false,
      };
      allSubjectsWithDemand.forEach((demandSubject) => {
        if (demandSubject.students.length > 0) {
          objectSubjectsDemand.nameSubjectsDemand.push(demandSubject);
          objectSubjectsDemand.demandSubjects =
            objectSubjectsDemand.demandSubjects + demandSubject.students.length;
          objectSubjectsDemand.subjectHasDemand = true;
        }
      });
      objectSubjectsDemand.nameSubjectsDemand.forEach((oneSubject) => {
        objectSubjectsDemand.onlyDemand.push({
          [oneSubject.name]: oneSubject.students.length,
        });
      });
      res.json(objectSubjectsDemand);
    })
    .catch((err) => {
      res.json(err);
    });
});

server.get("/advisorstatus", (req, res) => {
  User.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "password",
        "address",
        "birthday",
        "phone",
        "linkedin",
        "cv",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
  })
    .then((allAdvisors) => {
      let advisorStatus = {
        advisorsActives: [],
        advisorsInactives: [],
        admin: [],
        totalAdvisorsActives: 0,
        totalAdvisorsInactives: 0,
        totalAdvisors: 0,
        hasAdvisor: false,
      };

      allAdvisors.forEach((advisor) => {
        if (advisor.state === "admin") {
          advisorStatus.admin.push(advisor);
        } else if (advisor && allAdvisors.length > 0) {
          advisorStatus.hasAdvisor = true;
          advisorStatus.totalAdvisors = allAdvisors.length;
          if (advisor.isActive === true && advisor.state === "aceptado") {
            advisorStatus.advisorsActives.push(advisor);
          } else {
            advisorStatus.advisorsInactives.push(advisor);
          }
        }
      });
      advisorStatus.totalAdvisorsActives = advisorStatus.advisorsActives.length;
      advisorStatus.totalAdvisorsInactives =
        advisorStatus.advisorsInactives.length;
      advisorStatus.totalAdvisors =
        allAdvisors.length - advisorStatus.admin.length;

      res.json(advisorStatus);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
