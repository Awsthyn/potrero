const server = require('express').Router();

// TRAEMOS LOS VOLUNTARIOS DE LA BASE DE DATOS
const { Volunteer } = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/', ( req , res ) => {
    // BUSCA TODOS LOS VOLUNTARIOS Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
    Volunteer.findAll()
    .then( volunteers => {
        // OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "VOLUNTEERS" ESTÁ VACÍO. ASÍ
        // RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS VOLUNTARIOS DENTRO.
    !volunteers.length ? res.json("No hay voluntarios todavía.") : res.json( volunteers )
    })
    .catch( err => {
        // ENVÍA UN ERROR EN CASO DE QUE HAYA INCONVENIENTES.
        res.json( err )
    })
})

server.post('/', ( req , res ) => {
    // CREA UN VOLUNTARIO.

    // RECIBE POR BODY TODA LA INFORMACIÓN DEL VOLUNTARIO.
 const voluntario = req.body;
    Volunteer.create(voluntario)
    .then( volunteerCreated => { 
        // DEVUELVE EL VOLUNTARIO CREADO.
        res.json( volunteerCreated )
    })
    .catch( err => { 
        // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
        console.log( err )
        res.json( err )
    })
})

// BUSCA UN VOLUNTARIO EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get('/:id', ( req, res ) => {
    // BUSCA AL VOLUNTARIO.
    Volunteer.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( volunteerFound => {
        // SI ENCUENTRA AL VOLUNTARIO, ENVÍA SUS DATOS. O SINO, ENVÍA UN MENSAJE DE ERROR.
        !volunteerFound ? res.json('El voluntario no existe.') : res.json( volunteerFound )
    })
    .catch( err => {
        // SI HAY UN ERROR, LO ENVÍA.
        res.json( err )
    })
})

// MODIFICAR LA INFORMACIÓN DE UN VOLUNTARIO.
server.put('/:id', ( req, res ) => {
    // BUSCA Y MODIFICA AL VOLUNTARIO ENCONTRADO.
    Volunteer.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
       Volunteer.findOne({
           where: {
               id: req.params.id
           }
       })
       // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
       .then( volunteerWithChanges => {
            res.json( volunteerWithChanges )
       })
    })
    .catch( err => {
        res.json( err )
    })
})

module.exports = server;