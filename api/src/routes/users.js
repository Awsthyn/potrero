const server = require('express').Router();

// TRAEMOS LOS USUARIOS DE LA BASE DE DATOS
const { User } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/', (req, res) => {
    User.findAll()
    .then( users => {
        // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "USERS" ESTÁ VACÍO. ASÍ
        // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS USUARIOS DENTRO.
        !users.length ? res.json("No hay usuarios disponibles.") : res.json(users)
    })
    .catch( err => {
        res.json(err)
    })

})

// CREA UN USUARIO
server.post('/', ( req, res ) => {
// RECIBE LOS DATOS DEL USUARIO POR BODY
 const usuario = req.body;
    User.createInstanceFromBody(usuario)
    .then( userCreated => { // USUARIO CREADO
        res.json( userCreated )
    })
    .catch( err => { 
        // SI HAY UN ERROR, LO DEVUELVE. POR SI FALTÓ UN CAMPO POR COMPLETAR O MISMO LOS DATOS NO SON VÁLIDOS.         
        res.json( err )
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
        !userFound ? res.json("El usuario no existe.") : res.json( userFound ) 
    })
    .catch( err => {
        res.json( err )
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
            res.json( userWithChanges )
       })
    })
    .catch( err => {
        res.json( err )
    })
})

module.exports = server;