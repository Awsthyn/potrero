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

// IMPORT DE LA RUTA DE Mail con envío de los terminos y condiciones
const termsAndConditions = require("./termsAndConditions.js");

// IMPORT DE LA RUTA DE CLASS
const classRouter = require("./class.js");

//IMPORT DEL AÑO ESCOLAR
const academicLevelRouter = require("./academicLevel.js");

//IMPORT DEL AÑO ESCOLAR X SUBJECT
const academicLevelXSubjectRouter = require("./academicLevelXSubject.js");

// IMPORT DE LA RUTA DE HORARIOS DE UN VOLUNTARIO
const userScheduleRoute = require("./userSchedule.js");
//IMPORT DEL NIVEL EDUCATIVO - PRIMARIA - SECUNDARIA
const educationLevel = require("./educationLevel.js");

//IMPORT DEL MATCHING ENTRE STUDENTSCHEDULE Y USERSCHEDULE
const matching = require("./matching.js");

// IMPORT DE STATS.JS

const statsRouter = require("./stats.js");

const router = Router();

// ROUTES

// RUTAS DE USUARIOS
router.use("/users", usersRouter);

// RUTAS DE HORARIOS USUARIOS
router.use("/userschedule", userScheduleRouter);

// HOLA
// Ruta de autenticacion
router.use("/auth", authenticateRouter);

//Ruta de reseteo de password
router.use("/resetPassword", resetPassword);

//Ruta del mail de bienvenida al nuevo asesor
router.use("/mailAdmission", mailAdmission);

//Ruta del mail de bienvenida al nuevo asesor
router.use("/mailWelcomeRejection", mailWelcomeRejection);

//Ruta de mail con los términos y condiciones
router.use("/termsAndConditions", termsAndConditions);

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

// RUTA DE HORARIOS DE UN VOLUNTARIO
router.use("/userSchedule", userScheduleRoute);
//RUTA DE NIVEL DE EDUCACION - PRIMARIA - SECUNDARIA
router.use("/educationlevel", educationLevel);

//RUTA DE MATCHEO DE STUDENTSCHEDULE Y USERSCHEDULE
router.use("/matching", matching);

// RUTA DE ESTADÍSTICAS
router.use("/stats", statsRouter);

module.exports = router;
