const server = require("express").Router();

// TRAEMOS DataSheet DE LA BASE DE DATOS
const { DataSheet } = require("../db.js");

server.post('/', (req,res) => {
   console.log(req.body)
   DataSheet.create(req.body)
   .then(ds => res.send(ds))
   .catch(err => res.send(err))
})

module.exports = server;