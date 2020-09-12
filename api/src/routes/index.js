const { Router } = require('express');

// IMPORT ALL ROUTES

// IMPORT DE LA RUTA DE USUARIOS
const usersRouter = require('./users.js');

// IMPORT DE LA RUTA DE VOLUNTARIOS
const volunteersRouter = require('./volunteers.js');

// IMPORT DE LA RUTA DE STUDENTS - ALUMNOS
const studentRouter = require('./students.js');

// IMPORT DE LA RUTA DE TYPE-OF-DIFFICULTY
const typeOfDificulty = require('./typeOfDifficulty.js');

// IMPORT DE LA RUTA DE SUBJECT
const subjectsRouter = require('./subject.js');

// IMPORT DE LA RUTA DE Autenticación
const authenticateRouter = require('./authenticate.js');

// IMPORT DE LA RUTA DE Reseteo de Password
const resetPassword = require('./resetPassword.js');

// IMPORT DE LA RUTA DE Mail de Admisión
const mailAdmission = require('./mailAdmission.js');

// IMPORT DE LA RUTA DE Mail de Bienvenida o Rechazo de Voluntario
const mailWelcomeRejection = require('./mailWelcomeRejection.js');

const router = Router();

// ROUTES

// RUTAS DE USUARIOS
router.use('/users', usersRouter);

// RUTA DE VOLUNTARIOS
router.use('/volunteers', volunteersRouter);

// Ruta de autenticacion
router.use('/auth', authenticateRouter);

//Ruta de reseteo de password
router.use('/resetPassword', resetPassword);

//Ruta del mail de bienvenida al nuevo asesor
router.use('/mailAdmission', mailAdmission);

//Ruta del mail de bienvenida al nuevo asesor
router.use('/mailWelcomeRejection', mailWelcomeRejection);

// RUTA DE STUDENTS
router.use('/students', studentRouter);

// RUTA DE TYPEOFDIFFICULTY
router.use('/typeofdifficulty', typeOfDificulty);

// RUTA DE SUBJECTS
router.use('/subjects', subjectsRouter);

module.exports = router;
