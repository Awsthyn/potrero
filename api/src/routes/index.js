const { Router } = require("express");

// IMPORT ALL ROUTES

// IMPORT DE LA RUTA DE USUARIOS
const usersRouter = require("./users.js");

// IMPORT DE LA RUTA DE USUARIOS
const userScheduleRouter = require("./userSchedule.js");

// IMPORT DE LA RUTA DE STUDENTS - ALUMNOS
const studentRouter = require("./students.js");

// IMPORT DE LA RUTA DE STUDENTS - ALUMNOS
const studentScheduleRouter = require("./stundentSchedule.js");

// IMPORT DE LA RUTA DE STUDENTS - TYPE OF DIFF
const typeofdifxstudentRouter = require("./TypeOfDifXStudent.js");

// IMPORT DE LA RUTA DE STUDENTS - SUBJECT
const subjectxstudentRouter = require("./subjectXStudent");

// IMPORT DE LA RUTA DE STUDENTS - SUBJECT
const subjectxuserRouter = require("./subjectXUser");


// IMPORT DE LA RUTA DE TYPE-OF-DIFFICULTY
const typeOfDificulty = require("./typeOfDifficulty.js");

// IMPORT DE LA RUTA DE SUBJECT
const subjectsRouter = require("./subject.js");

// IMPORT DE LA RUTA DE Autenticación
const authenticateRouter = require("./authenticate.js");

// IMPORT DE LA RUTA DE Reseteo de Password
const resetPassword = require("./resetPassword.js");

// IMPORT DE LA RUTA DE Mail de Admisión
const mailAdmission = require("./mailAdmission.js");

// IMPORT DE LA RUTA DE Mail de Bienvenida o Rechazo de Voluntario
const mailWelcomeRejection = require("./mailWelcomeRejection.js");

// IMPORT DE LA RUTA DE CLASS
const classRouter = require("./class.js");

//IMPORT DEL AÑO DEL AÑO ESCOLAR
const academicLevelRouter = require("./academicLevel.js");

//IMPORT DEL AÑO DEL AÑO ESCOLAR
const academicLevelXSubjectRouter = require("./academicLevelXSubject.js");

const router = Router();

// ROUTES

// RUTAS DE USUARIOS
router.use("/users", usersRouter);

// RUTAS DE HORARIOS USUARIOS
router.use("/userschedule", userScheduleRouter);

// Ruta de autenticacion
router.use("/auth", authenticateRouter);

//Ruta de reseteo de password
router.use("/resetPassword", resetPassword);

//Ruta del mail de bienvenida al nuevo asesor
router.use("/mailAdmission", mailAdmission);

//Ruta del mail de bienvenida al nuevo asesor
router.use("/mailWelcomeRejection", mailWelcomeRejection);

// RUTA DE STUDENTS
router.use("/students", studentRouter);

// RUTA DE STUDENTSSCHEDULE
router.use("/studentschedule", studentScheduleRouter);

// RUTA DE STUDENT TOD X STUDENT
router.use("/typeofdifxstudent", typeofdifxstudentRouter);

// RUTA DE STUDENT TOD X STUDENT
router.use("/subjectxstudent", subjectxstudentRouter);

// RUTA DE STUDENT TOD X STUDENT
router.use("/subjectxuser", subjectxuserRouter);

// RUTA DE TYPEOFDIFFICULTY
router.use("/typeofdifficulty", typeOfDificulty);

// RUTA DE SUBJECTS
router.use("/subjects", subjectsRouter);

// RUTA DE AÑO ESCOLAR
router.use("/academiclevel", academicLevelRouter);

// RUTA DE CLASS
router.use("/class", classRouter);

// RUTA DE AÑO ESCOLAR X SUBJECT
router.use("/academiclevelxsubject", academicLevelXSubjectRouter);

module.exports = router;
