const server = require("express").Router();
const {matching} = require('./helpers/matchingHelpers')
const { Student, SubjectXStudent } = require("../db.js");


server.get('/:studentId', (req, res) => {

    SubjectXStudent.findAll({where: {studentId: req.params.studentId}})
    .then(data => Promise.all(data.map(e => matching(req.params.studentId, e.subjectId))))
    .then(data => {
        
        let cleanData = data.filter(e => e.length > 0)
        res.json(cleanData)})
   
   
})



server.get('/:studentId/:subject', (req, res) => {
    Promise.resolve(matching(req.params.studentId, req.params.subject))
    .then(data => res.json(data))
   
   
})



module.exports = server;
