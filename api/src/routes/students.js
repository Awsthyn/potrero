const server = require("express").Router();

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const {
  Student,
  TypeOfDifficulty,
  Subject,
  AcademicLevel,
  TODXStudent,
  SubjectXStudent,
  StudentSchedule,
} = require("../db.js");

// TRAEMOS SEQUELIZE
const Sequelize = require("sequelize");

server.get("/", (req, res) => {
  // BUSCA TODOS LOS STUDENTS Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
  Student.findAll({
    include: [
      {
        model: TypeOfDifficulty,
      },
      {
        model: Subject,
      }
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
    .then((studentFound) => {
      // SI ENCUENTRA AL STUDENT, ENVÍA SUS DATOS. O SINO, ENVÍA UN MENSAJE DE ERROR.
      !studentFound
        ? res.json("El student no existe.")
        : res.json(studentFound);
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
      req.body.subjectsId.forEach((idSub) => {
        studentCreated
          .addSubject(idSub)
          .then(() => console.log("Ok1"))
          .catch((err) => {
            // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
            console.log(err);
            res.json(err);
          });
      });

      // Recorre TODId los prepara en un array y los recorre
      // entonces agrega la materia relacionado con el id del estudiante
      req.body.TODId.forEach((idTOD) => {
        studentCreated
          .addTypeOfDifficulty(idTOD)
          .then(() => console.log("Ok2"))
          .catch((err) => {
            // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
            console.log(err);
            res.json(err);
          });
      });

      //AGREGA HORARIOS AL ESTUDIANTE
      // Recorre scheduleStudent los prepara en un objeto hasta 3 lugares con los numeros incrementando cuando llega a 3 se resetea la variable numero a 1 y vuelve a preparar el objeto, crea una StudentSchedule cada 3 posiciones de dias

      let dias = req.body.scheduleStudent.split("-");
      let separado = dias;
      let numero = 1;
      let obj = {};
      for (let i = 0; i < separado.length; i++) {
        if (numero === 1) {
          obj.startTime = separado[i];
          numero = numero + 1;
        } else if (numero === 2) {
          obj.endTime = separado[i];
          numero = numero + 1;
        } else if (numero === 3) {
          obj.nameWeekDay = separado[i];
          obj.studentId = sc.id;
          StudentSchedule.create(obj);
          numero = 1;
        }
      }
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

//BORRADO LÓGICO
// En lugar de eliminar un estudiante lo que hacemos es cambiarle el status a false
// Y así poder filtrar solamente por estudiantes activos y no perder la info por si
// mas adelante vulelve a la fundación.

server.put('/:id', (req, res) => {
    const {subjectsId} = req.body
    // BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
    SubjectXStudent.destroy({ where: { studentId: req.params.id } })
    .then(() => SubjectXStudent.bulkCreate(subjectsId.map(s => {return {subjectId: s, studentId: req.params.id}})))
    .then(() => Student.update(req.body, {where: {id: req.params.id}}))
    .then(() => {
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
        });
    })
    .catch((err) => {
      res.json(err);
    });
});
 
server.put('/:id/changestatus', (req, res)=>{
    Student.update({isActive: req.body.isActive},{where: {id: req.params.id}})
    .then(() => {
        Student.findOne({
            where: {
                id: req.params.id
            },
            include: 
            [
                {
                    model: TypeOfDifficulty
                },
                {
                    model: Subject
                }
            ]
        })
        // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
        .then(studentWithChanges => {
            res.json(studentWithChanges)
        })
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = server;

