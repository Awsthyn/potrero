const { Router } = require('express');

// IMPORT ALL ROUTES

// IMPORT DE LA RUTA DE USUARIOS
const usersRouter = require('./users.js');

// IMPORT DE LA RUTA DE VOLUNTARIOS
const volunteersRouter = require('./volunteers.js');


const router = Router();


// ROUTES

// RUTAS DE USUARIOS
router.use('/users', usersRouter);

// RUTA DE VOLUNTARIOS
router.use('/volunteers', volunteersRouter);

module.exports = router;