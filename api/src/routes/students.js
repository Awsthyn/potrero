const server = require("express").Router();
const isAuthenticated = require("./authenticate").isAuthenticated;

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const {
  Student,
  TypeOfDifficulty,
  Subject,
  AcademicLevel,
  TODXStudent,
  SubjectXStudent,
  StudentSchedule,
  Class,
} = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

server.get("/", (req, res) => {
  // BUSCA TODOS LOS STUDENTS Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
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

// BUSCA UN STUDENT EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get("/:id", (req, res) => {
  // BUSCA AL STUDENT.

  Promise.all([
    Student.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
    }),
    Class.findAll({ where: { studentId: req.params.id } }),
  ])
    .then((studentFound) => {
      // SI ENCUENTRA AL STUDENT, ENVÍA SUS DATOS. O SINO, ENVÍA UN MENSAJE DE ERROR.
      if (!studentFound) res.json("El student no existe.");
      else {
        let studentData = studentFound[0];
        studentData["dataValues"].classes = studentFound[1];
        res.json(studentData);
      }
    })
    .catch((err) => {
      // SI HAY UN ERROR, LO ENVÍA.
      res.json(err);
    });
});

server.post("/", (req, res) => {
  // CREA UN STUDENT.
  // RECIBE POR BODY TODA LA INFORMACIÓN DEL STUDENT.
  const student = req.body;
  let sc = null;
  Student.create(student)
    .then((studentCreated) => {
      sc = studentCreated;
      // Se espera valores de Id's de Subjects Ejemplo: 1,2
      // Recorre SubjectId los prepara en un array y los recorre
      // entonces agrega la materia relacionado con el id del estudiante
      const subjects = Promise.all(
        student.subjectsId.forEach((idSub) => {
          studentCreated
            .addSubject(idSub)
            .then(() => console.log("Ok1"))
            .catch((err) => {
              // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
              console.log(err);
              res.json(err);
            });
        })
      );

      // Recorre TODId los prepara en un array y los recorre
      // entonces agrega la materia relacionado con el id del estudiante
      const difficulties = Promise.all(
        student.TODId.forEach((idTOD) => {
          studentCreated
            .addTypeOfDifficulty(idTOD)
            .then(() => console.log("Ok2"))
            .catch((err) => {
              // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
              console.log(err);
              res.json(err);
            });
        })
      );
      const schedule = StudentSchedule.bulkCreate(
        student.scheduleStudent.map((e) => {
          return {
            studentId: sc.id,
            timeFrame: [e.startTime, e.endTime],
            nameWeekDay: e.nameWeekDay,
          };
        })
      );

      return Promise.all([subjects, difficulties, schedule]);
    })
    .then(() => {
      res.json("Alumno creado exitosamente");
    })
    .catch((err) => {
      // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
      console.log(err);
      res.json(err);
    });
});

server.put("/:id", (req, res) => {
  console.log(req.body)
  const { subjectsId } = req.body;
  // BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
  SubjectXStudent.destroy({ where: { studentId: req.params.id } })
    .then(() =>
      SubjectXStudent.bulkCreate(
        subjectsId.map((s) => {
          console.log('ssss',s)
          return { subjectId: s, studentId: req.body.id };
        })
      )
    )
    .then(() => Student.update(req.body, { where: { id: req.params.id } }))
    .then(() => {
      return (
        Student.findOne({
          where: {
            id: req.params.id,
          },
          include: [
            {
              model: TypeOfDifficulty,
            },
            {
              model: Subject,
            },
          ],
        })
          // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
          .then((studentWithChanges) => {
            res.json(studentWithChanges);
          })
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

//BORRADO LÓGICO
// En lugar de eliminar un estudiante lo que hacemos es cambiarle el status a false
// Y así poder filtrar solamente por estudiantes activos y no perder la info por si
// mas adelante vulelve a la fundación.
server.put("/:id/changestatus", (req, res) => {
  Student.update(
    { isActive: req.body.isActive },
    { where: { id: req.params.id } }
  )
    .then(() => {
      return (
        Student.findOne({
          where: {
            id: req.params.id,
          },
          include: [
            {
              model: TypeOfDifficulty,
            },
            {
              model: Subject,
            },
          ],
        })
          // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
          .then((studentWithChanges) => {
            res.json(studentWithChanges);
          })
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = server;
