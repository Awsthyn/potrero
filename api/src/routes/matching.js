const server = require("express").Router();
const Sequelize = require("sequelize");

//const {conn} = require("../db")
const { Student, StudentSchedule, User, UserSchedule, Subject, Class } = require("../db.js");


server.get('/:studentId/:subject', (req, res) => {
    let { subject } = req.params
    //Busca todos los studentSchedules del alumno ingresado por req.params
    StudentSchedule.findAll({where: {studentId: req.params.studentId}})
    .then((studentSchedulesFound) => {
        //Busca todos los userSchedules que overlapean con cada registro del studentSchedule de ese alumno
        return Promise.all(studentSchedulesFound.map(schedule => Promise.all([UserSchedule.findAll({
        where: {
            nameWeekDay: schedule.nameWeekDay, 
            timeFrame:{[Sequelize.Op.overlap]: [schedule.timeFrame[0], schedule.timeFrame[1]]}
                },
        include: [{
            model: User,
            attributes: {
                exclude: [
                  "createdAt","updatedAt","password","address","birthday","phone","linkedin","cv","resetPasswordToken","resetPasswordExpires",
                ],
              },
            where: {
                state: {
                    [Sequelize.Op.in]: ["aceptado", "admin", "pendiente"]//!SACAR PENDIENTE, LO USÉ COMO PRUEBA. LOS ADMIN DAN CLASES?
                },
                isActive: {
                    [Sequelize.Op.in]: [true, false]
                }
            },
            include: [{
                model: Subject,
                attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                where: {
                    id: subject
                }
            },
            {
                model: Class,
            }
            ]
        } 
        ]
            })
        , schedule])))// Es obligatorio mandar schedule al siguiente "then", para poder hacer las comparaciones
    })
    .then((data) => {
        let finalData = []
        //Dos loops anidados... O(n^2).. ver si se puede mejorar.
        data.map(elem =>{
            for(userRow of elem[0]){
                //Almaceno startTime y endTime del registro de userSchedule y starTime y endTime del registro de studentSchedule
                let a = userRow.timeFrame[0].value
                let b = userRow.timeFrame[1].value
                let c = elem[1].timeFrame[0].value
                let d = elem[1].timeFrame[1].value
                //Hago  B-A, B-C, D-C, D-A. El que me de el valor más bajo es el que sirve para saber donde ocurre el solapamiento
                let differences = [
                    {
                        endTime: a,
                        startTime: b,
                        diferencia: b-a
                    },
                    {
                        endTime: b,
                        startTime: c,
                        diferencia: b-c
                    },
                    {
                        endTime: d,
                        startTime: c,
                        diferencia: d-c
                    },
                    {
                        endTime: d,
                        startTime: a,
                        diferencia: d-a
                    }
                ]
                //Obtengo el mínimo de esas 4 restas
                let min = Math.min(differences[0].diferencia, differences[1].diferencia,differences[2].diferencia, differences[3].diferencia)
                let obj = differences.filter(e => e.diferencia === min)
                obj[0].user = userRow.user
                obj[0].nameWeekDay = userRow.nameWeekDay
                finalData.push(obj[0])


            }
        })
        return finalData})
    .then(data => {
        // Me traigo todas las clases, correspondientes al alumno y al user en cuestión, que overlapeen con los horarios matcheados
        // Esto es el primer paso para conocer la disponibilidad real de horarios
        Promise.all(data.map(elem =>{
           return Promise.all([elem, Class.findAll({where: {
               [Sequelize.Op.or]: [
                    {studentId: req.params.studentId},
                    {userId: elem.user.id}
            ],
                duration: {[Sequelize.Op.overlap]: [elem.startTime, elem.endTime]}
            }})

        ])}))
        .then(data => res.json(data))
        
    })    
})



module.exports = server;
