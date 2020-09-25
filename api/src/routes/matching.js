const server = require("express").Router();
const Sequelize = require("sequelize");

//const {conn} = require("../db")
const { StudentSchedule, User, UserSchedule, Subject, Class } = require("../db.js");

//merge(): une intervalos de números.. Ej: [[1,3],[2,6],[8,10]] => [[1,6],[8,10]]
function merge(arr) {
    // copy and sort the array
    var result = arr.slice().sort(function(a, b) {
            return a[0] > b[0];
        }),
        i = 0;

    while(i < result.length - 1) {
        var current = result[i],
            next = result[i+1];

        // check if there is an overlapping
        if(current[1] >= next[0]) {
            current[1] = Math.max(current[1], next[1]);
            // remove next
            result.splice(i+1, 1);
        } else {
            // move to next
            i++;
        }
    }
    return result;
};

//findFreeinterval() devuelve un array con los intervalos no overlapeados.. ej: [[1,3],[5,6],[7,9]] => [[3,5],[6,7]]
function findFreeinterval(arr){
    let disponible = []
    for(let i = 1; i < arr.length; i++){
        prevEnd = arr[i - 1][1]
        currStart = arr[i][0] 
        if (prevEnd < currStart) disponible.push([prevEnd, currStart])
    }
    return disponible
}


const sorter = {
    "Lunes": 1,
    "Martes": 2,
    "Miercoles": 3,
    "Jueves": 4,
    "Viernes": 5,
  }
function sortByDay(a, b) {
    let day1 = a.nameWeekDay
    let day2 = b.nameWeekDay
    return sorter[day1] - sorter[day2];
}
  

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
                    [Sequelize.Op.in]: ["aceptado", "admin"]
                },
                isActive: {
                    [Sequelize.Op.in]: [true]
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
                        endTime: b,
                        startTime: a,
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
        .then(data => {
            //Creo una variable que va a almacenar los intervalos de tiempo libres
            let disponible = []
            data.map(m => {
                let array = []
                //El primer elemento de array es [0, startTime].. necesario para detectar intervalos de tiempos libres
                array.push([0,Number(m[0].startTime)])
                //Coloco todos los intervalos de tiempo de las clases
                m[1].map(h => array.push([Number(h.duration[0].value), Number(h.duration[1].value)]))
                //El último elemento de array es [endTime, 23].. necesario para detectar intervalos de tiempos libres
                array.push([Number(m[0].endTime), 23])
                //console.log(array)
                array = merge(array)
                let freeIntervalStore = findFreeinterval(array)
                if(disponible.length > 0){
                    //Este algoritmo descarta valores repetidos
                    //Faltaría el tema de valores overlapeados
                    let truthArray = []
                    disponible.map(e =>{
                    let a = 0
                    let b = 0    
                    a += m[0].user.id === e.user.id ? 1 : 0; b += 1;
                    a += freeIntervalStore[0][0] === e.disponibleTime[0][0] ? 1 : 0; b += 1;
                    a += freeIntervalStore[0][1] === e.disponibleTime[0][1] ? 1 : 0; b += 1;
                    a += e.nameWeekDay === m[0].nameWeekDay ? 1 : 0; b += 1;

                    truthArray.push(a === b) 
                    })
                    truthArray.includes(true) ? null : disponible.push({disponibleTime: freeIntervalStore, user: m[0].user, nameWeekDay: m[0].nameWeekDay })
                }

                else disponible.push({disponibleTime: freeIntervalStore, user: m[0].user, nameWeekDay: m[0].nameWeekDay })                
            })


            res.json(disponible.sort(sortByDay))})
            .catch(err => console.log(err))  
    })
})



module.exports = server;
