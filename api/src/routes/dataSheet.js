const server = require("express").Router();

// TRAEMOS DataSheet DE LA BASE DE DATOS
const { DataSheet, Class } = require("../db.js");

server.get('/:userId', (req, res) => {
   DataSheet.findAll({
      include: [{model: Class, where: {
         userId: req.params.userId
      } }],
      
   })
   .then(ds => res.send(ds))
   .catch(err => res.send(err))
})

server.post('/', (req, res) => {
   DataSheet.create(req.body)
   .then(ds => res.send(ds))
   .catch(err => res.send(err))
})

module.exports = server;