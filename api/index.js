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
const { conn, User, Volunteer, Student, TypeOfDifficulty, Subject } = require('./src/db.js');
const { initialVolunteers, initialUsers, initialSubjects, initialStudents } = require("./src/seed");

// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
server.listen(3001, () => {
console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
})
// .then(() => {
//     Volunteer.bulkCreate(initialVolunteers);
//   })
// .then(() => {
//     Subject.bulkCreate(initialSubjects);
//   })
// .then(() => {
//     Student.bulkCreate(initialStudents);
//   })  
//  .then(() => {
//     const users = initialUsers.map(u => User.create(u, {individualHooks: true}))
//   Promise.all(users)
//   })
// .catch((error) => console.log(error))
