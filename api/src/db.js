require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/potrero`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Class, DataSheet, Role, Student, Subject, TypeOfDifficulty, User, Volunteer } = sequelize.models;

// Aca vendrian las relaciones

//BelongsTo(...) -> Escribe el id referente en la entidad entre ()

Class.belongsTo(DataSheet);
Class.belongsTo(User);
Class.belongsTo(Student);
Class.belongsTo(Subject);

Subject.belongsToMany(Volunteer, { through: 'SubjectXVolunteer' });
Subject.hasOne(DataSheet);
Subject.hasOne(Class)

Volunteer.belongsToMany(Subject, { through: 'SubjectXVolunteer' });
Volunteer.hasOne(User);

Student.belongsToMany(TypeOfDifficulty, { through: 'TODXStudent' });
Student.belongsToMany(User, { through: 'StudentXUser' });
Student.hasMany(DataSheet);
Student.hasOne(Class)

TypeOfDifficulty.belongsToMany(Student, { through: 'TODXStudent' });

User.belongsToMany(Student, { through: 'StudentXUser' });
User.belongsTo(Role);
User.hasMany(DataSheet);
User.belongsTo(Volunteer);

Role.hasOne(User);

DataSheet.hasOne(Class)
DataSheet.belongsTo(Subject);
DataSheet.belongsTo(User);
DataSheet.belongsTo(Student);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
