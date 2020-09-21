const server = require("express").Router();
const { DB_USER, DB_PASSWORD, DB_HOST, PGDATABASE } = process.env;
var moment = require('moment');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(PGDATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

const { Student, StudentSchedule, User, UserSchedule } = require("../db.js");


server.get("/", (req, res) => {

const s1 = "01:00:00"
const e1 = "11:10:00"

const s2 = "10:00:00"
const e2 = "11:20:00"

sequelize.query(`(SELECT tsrange('2010-01-01 ${s1}', '2010-01-01 ${e1}') && tsrange('2010-01-01 ${s2}', '2010-01-01 ${e2}'))`)
.then(data => {
    if(data[0][0]["?column?"]){
    var a = moment(s1, 'HH:mm:ss').utcOffset(-180);
    var b = moment(e1, 'HH:mm:ss').utcOffset(-180);
    var c = moment(s2, 'HH:mm:ss').utcOffset(-180);
    var d = moment(e2, 'HH:mm:ss').utcOffset(-180);
    let differences = [
        {
            sumando: a,
            restando: b,
            diferencia: b.diff(a, 'minutes')
        },
        {
            sumando: b,
            restando: c,
            diferencia: b.diff(c, 'minutes')
        },
        {
            sumando: d,
            restando: c,
            diferencia: d.diff(c, 'minutes')
        },
        {
            sumando: d,
            restando: a,
            diferencia: d.diff(a, 'minutes')
        }
    ]
    let min = Math.min(differences[0].diferencia, differences[1].diferencia,differences[2].diferencia, differences[3].diferencia)
    let obj = differences.filter(e => e.diferencia === min)
    
    res.json(obj)    
    }
else res.json(false)
})
.catch(err => console.log(err))
    
    })
    

server.get('/:studentId', (req, res) => {
    const { subject } = req.body
    //Busca todos los studentSchedules del alumno ingresado por req.params
    StudentSchedule.findAll({where: {studentId: req.params.studentId}})
    .then((studentSchedulesFound) => {
        //Busca todos los userSchedules que overlapean con cada registro del studentSchedule de ese alumno
        return Promise.all(studentSchedulesFound.map(schedule => Promise.all([UserSchedule.findAll({
        where: {nameWeekDay: schedule.nameWeekDay, timeFrame:{[Sequelize.Op.overlap]: [schedule.timeFrame[0], schedule.timeFrame[1]]}}})
        , schedule])))// ES OBLIGATORIO MANDAR SCHEDULE AL SIGUIENTE "THEN", PARA PODER HACER LAS COMPARACIONES
})
    .then((data) => {
        let finalData = []
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
                obj[0].userId = userRow.userId
                obj[0].nameWeekDay = userRow.nameWeekDay
                finalData.push(obj[0])


            }
        })
        res.json(finalData)})
})



module.exports = server;
