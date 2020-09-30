const server = require("express").Router();

// TRAEMOS CLASS DE LA BASE DE DATOS
const {
  Class,
  DataSheet,
  Subject,
  User,
  Student,
  AcademicLevel,
  EducationLevel,
} = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

/////////////EXCLUI LOS CREATEDAT, UPDATEDAT EN GRAL AGREGENLO SI ES NECESARIO/////////////////
// BUSCA UNA CLASE EN PARTICULAR POR SU ID

server.get('/:classId', (req, res) => {
  Class.findOne({ 
    where: {id: req.params.classId}, 
    include: [{model: Subject}, {model: Student}, {model: User}]
  })
  .then(clase => res.send(clase))
  .catch(err => res.send(err))
})

server.get("/", (req, res) => {
  // BUSCA TODAS LAS CLASES Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
  Class.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "dataSheetId",
        "userId",
        "studentId",
        "subjectId ",
      ],
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
      {
        model: Subject,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: AcademicLevel,
            attributes: {
              exclude: ["createdAt", "updatedAt", "educationLevelId"],
            },
          },
        ],
      },
      {
        model: DataSheet,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  })
    .then((classes) => {
      // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "CLASSES" ESTÁ VACÍO. ASÍ
      // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS CLASSES DENTRO.
      classes.length === 0
        ? res.json("No existen clases todavía.")
        : res.json(classes);
    })
    .catch((err) => {
      // ENVÍA UN ERROR EN CASO DE QUE HAYA INCONVENIENTES.
      res.json(err);
    });
});

// RARAMENTE NO ME ACEPTA LOS INCLUDE ANIDADOS EN USER/ID Y STUDENT/ID PERO SI EN DATASHEET/ID

// BUSCA TODAS LAS CLASES DE UN USUARIO EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get("/user/:id", (req, res) => {
  Class.findAll({
    where: {
      userId: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "dataSheetId",
        "userId",
        "studentId",
        "subjectId",
      ],
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
      {
        model: Subject,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: DataSheet,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    {
      model: Student
    }
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((classes) => {
      // SI EL USUARIO TIENE CLASES ASOCIADAS, ENVÍA SUS DATOS. O SINO, ENVÍA UN MENSAJE DE ERROR.
      classes.length === 0
        ? res.json("El usuario no tiene clases asociadas.")
        : res.json(classes);
    })
    .catch((err) => {
      // SI HAY UN ERROR, LO ENVÍA.
      res.send(err);
    });
});

// BUSCA TODAS LAS CLASES DE UN ESTUDIANTE EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get("/student/:id", (req, res) => {
  Class.findAll({
    where: {
      studentId: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "dataSheetId",
        "userId",
        "studentId",
        "subjectId",
      ],
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
      {
        model: Subject,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: DataSheet,
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((classes) => {
      classes.length === 0
        ? res.json("El estudiante no tiene clases asociadas.")
        : res.json(classes);
    })
    .catch((err) => {
      res.send(err);
    });
});

// BUSCA LA CLASE ASOCIADA A UNA DATASHEET.
server.get("/datasheet/:id", (req, res) => {
  Class.findOne({
    where: {
      dataSheetId: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "dataSheetId",
        "userId",
        "studentId",
        "subjectId",
      ],
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
      {
        model: Subject,
        attributes: { exclude: ["createdAt", "updatedAt"] },
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
      },
      {
        model: DataSheet,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  })
    .then((dsClass) => {
      !dsClass
        ? res.json("No existe una clase asociada a esa datasheet.")
        : res.json(dsClass);
    })
    .catch((err) => {
      res.send(err);
    });
});

// BUSCA TODAS LAS CLASES ASOCIADAS A UNA ASIGNATURA/SUBJECT.
server.get("/subject/:id", (req, res) => {
  Class.findAll({
    where: {
      subjectId: req.params.id,
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "dataSheetId",
        "userId",
        "studentId",
        "subjectId",
      ],
    },
    include: [
      {
        model: Subject,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        include: [
          {
            model: AcademicLevel,
            attributes: {
              exclude: ["createdAt", "updatedAt", "educationLevelId"],
            },
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((classes) => {
      classes.length === 0
        ? res.json("La asignatura no tiene clases asociadas.")
        : res.json(classes);
    })
    .catch((err) => {
      res.send(err);
    });
});

// CREA UNA CLASE NUEVA.
server.post("/", (req, res) => {
  // RECIBE TODA LA INFORMACIÓN POR BODY.
  console.log(req.body)
  const newClass = req.body;
  Class.create(newClass)
    .then((createdClass) => {
      // DEVUELVE LA CLASE CREADA.
      res.json(createdClass);
    })
    .catch((err) => {
      res.send(err);
    });
});

// ELIMINA UNA CLASE.
server.delete("/:id", (req, res) => {
  Class.destroy({
    where: {
      id: req.params.id,
    },
  })
    //UNA VEZ ELIMINADO DEVUELVE UN MENSAJE
    .then(() => {
      res.status(200);
      res.send("La clase fue eliminada.");
    })
    .catch((err) => {
      res.json(err);
    });
});

server.post("/:idClass/datasheet/", (req, res) => {
  const newDataSheet = req.body;
  DataSheet.createInstanceFromBody(newDataSheet)
    // "ds" ES LA NUEVA DATASHEET CREADA PARA LA CLASE.
    .then((ds) => {
      Class.update(
        { dataSheetId: ds.id },
        {
          where: {
            id: req.params.idClass,
          },
        }
      )
        // DATASHEET CREADA DENTRO DE LA CLASE.
        .then(() => {
          Class.findOne({
            where: {
              id: req.params.idClass,
            },
          }).then((classWithNewDataSheet) => {
            res.json(classWithNewDataSheet);
          });
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
