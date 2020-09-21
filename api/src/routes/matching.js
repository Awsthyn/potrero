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
    

module.exports = server;
