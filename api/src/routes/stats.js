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

const isUserAdmin = require("./middlewares.js").isUserAdmin;
const isUserActive = require("./middlewares.js").isUserActive;

// , isUserActive, isUserAdmin

server.get("/assistances", (req, res) => {
  DataSheet.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "concentration",
        "companionName",
        "internetConnection",
        "performance",
        "someoneAccompaniesHim",
        "comments",
        "duration",
        "attitude",
        "hadExam",
        "qualification",
      ],
    },
    include: {
      model: Class,
      attributes: {
        exclude: ["updatedAt", "createdAt", "userId", "studentId", "subjectId"],
      },
      include: {
        model: Student,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "phone",
            "email",
            "tutorFirstName",
            "tutorLastName",
            "tutorPhone",
            "tutorEmail",
            "interests",
            "motivations",
            "isActive",
          ],
        },
      },
    },
  })
    .then((allClasses) => {
      let countAssistance = [];
      let countDelay = [];
      let countNoJustify = [];
      let countHaveJustify = [];
      let moreDetailsOfNoJustify = [];

      allClasses.forEach((element) => {
        if (element.assistance === "presente") {
          countAssistance.push(element.assistance);
        } else if (element.assistance === "no justificada") {
          moreDetailsOfNoJustify.push({
            [element.class.nameWeekDay]: element.class.student,
            fecha: element.class.createdAt,
          });
          countNoJustify.push(element.class);
        } else if (element.assistance === "justificada") {
          countHaveJustify.push(element.assistance);
        } else if (element.assistance === "tardanza") {
          countDelay.push(element.assistance);
        }
      });

      let totalAccount =
        countAssistance.length +
        countNoJustify.length +
        countHaveJustify.length +
        countDelay.length;

      let countTotalAssistance = {
        noJustifyDetails: moreDetailsOfNoJustify,
        assistance: countAssistance.length,
        noJustify: countNoJustify.length,
        haveJustify: countHaveJustify.length,
        delay: countDelay.length,
        total: totalAccount,
        info: allClasses,
      };

      res.json(countTotalAssistance);
    })
    .catch((err) => {
      console.log(err);
    });
});

//A futuro USAR EXCLUDES CORRECTAMENTE

// , isUserActive, isUserAdmin,

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

// , isUserActive, isUserAdmin

server.get("/qualification", (req, res) => {
  DataSheet.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "concentration",
        "assitance",
        "companionName",
        "internetConnection",
        "performance",
        "someoneAccompaniesHim",
        "comments",
        "duration",
        "attitude",
      ],
    },
  })
    .then((allClasses) => {
      let countQualification = [];
      allClasses.forEach((element) => {
        if (element.hadExam == true) {
          let num = parseInt(element.qualification);
          countQualification.push(num);
        }
      });
      res.json(countQualification);
    })
    .catch((err) => {
      console.log(err);
    });
});

// isUserActive, isUserAdmin, 

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

// isUserActive, isUserAdmin,

server.get("/demandwithoffer", (req, res) => {
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
            "tutor",
            "interests",
            "motivations",
            "isActive",
            "tutorLastName",
            "tutorFirstName",
            "tutorPhone",
            "tutorEmail",
          ],
        },
      },
      {
        model: User,
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
            "profilePicture",
            "backDNI",
            "frontDNI",
          ],
        },
      },
    ],
  })
    .then((subjectsWithDemandAndOffer) => {
      let offersAvailables = [];
      let demandsAvailables = [];

      let totalDemandAndOffer = {
        allDemands: [],
        allOffer: [],
        totalDemands: 0,
        totalOffers: 0,
        totalOfferWithoutDemand: 0,
        totalDemandWithoutOffer: 0,
      };

      subjectsWithDemandAndOffer.forEach((element) => {
        if (element.students.length > 0) {
          element.students.forEach((studentsDemand) => {
            demandsAvailables.push(studentsDemand);
          });
        }
        if (element.users.length > 0) {
          offersAvailables.push(element);
        }
      });
      let advisorsAccepted = [];
      let studentsTotales = 0;
      let sumaDeOfertas = 0;

      offersAvailables.forEach((subjectsOffered) => {
        advisorsAccepted = subjectsOffered.users.filter(
          (advisor) =>
            advisor.state !== "rechazado" &&
            advisor.state !== "pendiente" &&
            advisor.isActive !== false
        );
        totalDemandAndOffer.allOffer.push({
          [subjectsOffered.name]: advisorsAccepted,
        });
        studentsTotales = studentsTotales + subjectsOffered.students.length;
        sumaDeOfertas = sumaDeOfertas + advisorsAccepted.length;
        totalDemandAndOffer.allDemands.push({
          [subjectsOffered.name]: subjectsOffered.students,
        });
      });

      const sumasTotales = (arg) => {
        arg.totalDemands = studentsTotales;
        arg.totalOffers = sumaDeOfertas;
      };

      sumasTotales(totalDemandAndOffer);

      res.json(totalDemandAndOffer);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
