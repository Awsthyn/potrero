const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { 
    User, 
    Subject, 
    Student, 
    TypeOfDifficulty, 
    AcademicLevel,
    EducationLevel,
    StudentSchedule,
} = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');



server.get('/', (req, res) => {
    console.log("Bienvenido admin")
});

server.get('/voluntarios', (req, res) => {
    User.findAll()
    .then( respuesta => {
      console.log( respuesta )
    })
});

server.get('/estudiantes', (req, res) => {
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
            model: TypeOfDifficulty,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Subject,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
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
            model: StudentSchedule,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      })
        .then((students) => {
          // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "STUDENTS" ESTÁ VACÍO. ASÍ
          // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS STUDENTS DENTRO.
          !students.length
            ? res.json("No hay alumnos todavía.")
            : res.json(students);
        })
        .catch((err) => {
          // ENVÍA UN ERROR EN CASO DE QUE HAYA INCONVENIENTES.
          res.json(err);
        });
});

server.get('/materias', (req, res) => {
    Subject.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
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
  })
    .then((materia) => {
      // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "SUBJECT" ESTÁ VACÍO. ASÍ
      // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LAS MATERIAS DENTRO.
      !materia.length
        ? res.json("No hay materias disponibles.")
        : res.json(materia);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;


// VOY A BUSCAR UN VASO DE AGUA, VUELVO PRONTOS//