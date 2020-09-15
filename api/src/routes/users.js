const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { User } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

// USAMOS ESTE MIDDLEWARE PARA GUARDAR ARCHIVOS
const multer = require('multer');
const upload = multer({ dest: `${__dirname}/uploads` });

server.get('/', (req, res) => {
    User.findAll()
    .then( users => {
        // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "USERS" ESTÁ VACÍO. ASÍ
        // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS USUARIOS DENTRO.
        !users.length ? res.send("No hay usuarios disponibles.") : res.send(users)
    })
    .catch( err => {
        res.send(err)
    })

})

// CREA UN USUARIO
server.post('/', upload.single('cv'), ( req, res ) => {
// RECIBE LOS DATOS DEL USUARIO POR BODY
console.log('BODY FILE',req.file)
    let usuario;
    if (!req.file) {
        usuario = req.body
    } else {
        usuario = { ...req.body, cv: `${req.file.filename}`}
    }
    User.createInstanceFromBody(usuario)
    .then( userCreated => { // USUARIO CREADO
        console.log('userCreated ',userCreated)
        res.send( userCreated )
    })
    .catch( err => { 
        // SI HAY UN ERROR, LO DEVUELVE. POR SI FALTÓ UN CAMPO POR COMPLETAR O MISMO LOS DATOS NO SON VÁLIDOS.         
        res.send( err )
    })
})

// BUSCA UN USUARIO EN ESPECÍFICO Y MUESTRA SUS DATOS.
server.get('/:id', ( req, res ) => {
    // ACÁ BUSCA UN USUARIO EN LA BASE DE DATOS
    User.findOne({
        where:{
            id: req.params.id
        }
    })
    .then( userFound => {       
        // SI ENCUENTRA AL USUARIO, LO ENVÍA. SINO, ENVÍA UN MENSAJE DE ERROR.
        !userFound ? res.send("El usuario no existe.") : res.send( userFound ) 
    })
    .catch( err => {
        res.send( err )
    })
})

// BUSCA UN USUARIO Y MODIFICA LA INFORMACIÓN QUE LE HAYAN ENVIADO POR BODY
server.put('/:id', ( req, res ) => {
    // BUSCA Y MODIFICA AL USUARIO ENCONTRADO.
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
    .then(() => {
       User.findOne({
           where: {
               id: req.params.id
           }
       })
       .then( userWithChanges => {
            res.send( userWithChanges )
       })
       .catch( err => {
        res.send( err )
    })
    })
    .catch( err => {
        res.send( err )
    })
})

module.exports = server;