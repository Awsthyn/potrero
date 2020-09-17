//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, User, Student, TypeOfDifficulty, Subject, Role, TODXStudent,SubjectXVolunteer,SubjectXStudent,StudentXUser, AcademicLevel} = require('./src/db.js');
/*const { initialVolunteers, initialUsers, initialSubjects, initialStudents,initialRoles,initialTypeOfDifficulty,initialTODXStudent} = require("./src/seed");*/

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
server.listen(3001, () => {
console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
})
