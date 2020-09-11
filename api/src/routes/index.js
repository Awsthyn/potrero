const { Router } = require('express');

// IMPORT ALL ROUTES

// IMPORT DE LA RUTA DE USUARIOS
const usersRouter = require('./users.js');

// IMPORT DE LA RUTA DE VOLUNTARIOS
const volunteersRouter = require('./volunteers.js');

// IMPORT DE LA RUTA DE Autenticación
const authenticateRouter = require('./authenticate.js');

// IMPORT DE LA RUTA DE Reseteo de Password
const resetPassword = require('./resetPassword.js');

// IMPORT DE LA RUTA DE Mail de Admisión
const mailAdmission = require('./mailAdmission.js');

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

module.exports = router;
