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
    !volunteers.length ? res.send("No hay voluntarios todavía.") : res.send( volunteers )
    })
    .catch( err => {
        // ENVÍA UN ERROR EN CASO DE QUE HAYA INCONVENIENTES.
        res.send( err )
    })
})

server.post('/', ( req , res ) => {
    // CREA UN VOLUNTARIO.
    // RECIBE POR BODY TODA LA INFORMACIÓN DEL VOLUNTARIO.
 const voluntario = req.body;
    Volunteer.create(voluntario)
    .then( volunteerCreated => {
        // DEVUELVE EL VOLUNTARIO CREADO.
        res.send( volunteerCreated )
    })
    .catch( err => {
        // SI HAY UN ERROR, DEVUELVE QUÉ CAMPO FALTA COMPLETAR.
        console.log( err )
        res.send( err )
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
        !volunteerFound ? res.send('El voluntario no existe.') : res.send( volunteerFound )
    })
    .catch( err => {
        // SI HAY UN ERROR, LO ENVÍA.
        res.send( err )
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
       .then( volunteerWithChanges => {
            // UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
            res.send( volunteerWithChanges )
       })
       .catch(err => res.send(err));
    })
    .catch( err => {
        res.send( err )
    })
})

module.exports = server;
