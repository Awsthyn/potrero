const server = require("express").Router();
const {
    Class,
    DataSheet,
    Subject,
    User,
    Student,
    AcademicLevel,
    EducationLevel,
  } = require("../db.js");

server.get('/assistances', (req, res) => {
    DataSheet.findAll({
        attributes: {
        exclude: [
          "createdAt",
          "updatedAt"
        ],
      }
    })
    .then( allClasses => {
        let countAssistance = [];
        let countInassistance = [];
        let countDelay = [];
        // res.json(allClasses)
        allClasses.forEach( element => {
            if(element.assistance === 'presente'){
            countAssistance.push(element.assistance)
            }
            else if(element.assistance === 'ausente'){
                countInassistance.push(element.assistance);
            }
            else if(element.assistance === 'tardanza'){
                countDelay.push(element.assistance);
            }
        })
        let countTotalAssistance = {
            assistance: countAssistance.length,
            inassistance: countInassistance.length,
            delay: countDelay.length,
            total: countAssistance.length + countInassistance.length + countDelay.length
        }
        res.json(countTotalAssistance)
    })
    .catch( err => {
        console.log( err )
    })
});

server.get('/assistances/:id', (req, res) => {
    Student.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Class,
            include: [{
                model: DataSheet
            },
        {
            model: Subject
        }]
        }]
    })
    .then( allDataSheetFromUser => {
        let assistanceFromUser = [];
        let presenteFromUser = [];
        let tardanzaFromUser = [];
        let ausenteFromUser = [];

        allDataSheetFromUser.classes.forEach( element => {
            assistanceFromUser.push(element.dataSheet.assistance)
        });

        assistanceFromUser.forEach( assistence => {
            if(assistence === 'presente'){
               presenteFromUser.push(assistence)
            }
            else if(assistence === 'ausente'){
                ausenteFromUser.push(assistence)
            }
            else if(assistence === 'tardanza'){
                tardanzaFromUser.push(assistence)
            }
        })

        let recorrerAsisstances = {
            presente: presenteFromUser.length,
            tardanza: tardanzaFromUser.length,
            ausente: ausenteFromUser.length,
            total: presenteFromUser.length + tardanzaFromUser.length + ausenteFromUser.length
        }

        res.json( recorrerAsisstances );
    })
    .catch( err => {
        console.log( err )
    })
})

module.exports = server;