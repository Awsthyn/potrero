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

const router = Router();


// ROUTES

// RUTAS DE USUARIOS
router.use('/users', usersRouter);

// RUTA DE VOLUNTARIOS
router.use('/volunteers', volunteersRouter);

// RUTA DE STUDENTS
router.use('/students', studentRouter);

// RUTA DE TYPEOFDIFFICULTY
router.use('/typeofdifficulty', typeOfDificulty);

module.exports = router;