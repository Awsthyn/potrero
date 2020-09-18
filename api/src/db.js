require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { userInfo } = require("os");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/potrero`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Class,
  DataSheet,
  Student,
  StudentSchedule,
  Subject,
  TypeOfDifficulty,
  User,
  UserSchedule,
  AcademicLevel,
} = sequelize.models;

// Aca vendrian las relaciones

//BelongsTo(...) -> Escribe el id referente en la entidad entre ()

//CLASE
Class.belongsTo(DataSheet);
Class.belongsTo(User);
Class.belongsTo(Student);
Class.belongsTo(Subject);

//MATERIA
Subject.belongsToMany(User, { through: "SubjectXUser", timestamps: false });
Subject.hasMany(Class);
Subject.belongsToMany(Student, {
  through: "SubjectXStudent",
  timestamps: false,
});
Subject.belongsToMany(AcademicLevel, {
  through: "academicLeveltXSubject",
  timestamps: false,
});

//AÑO ACADEMICO
AcademicLevel.belongsToMany(Subject, { through: "academicLeveltXSubject" });

//ALUMNO
Student.belongsToMany(TypeOfDifficulty, {
  through: "TODXStudent",
  timestamps: false,
});
Student.hasMany(Class);
Student.hasMany(StudentSchedule);
Student.belongsToMany(Subject, {
  through: "SubjectXStudent",
  timestamps: false,
});

//TIPO DE DIFICULTAD DEL ALUMNO
TypeOfDifficulty.belongsToMany(Student, {
  through: "TODXStudent",
  timestamps: false,
});

//USER ACEPTADO O ADMIN DEL SISTEMA
User.belongsToMany(Subject, { through: "SubjectXUser", timestamps: false });
User.hasMany(UserSchedule);

//CALIFICACION POR CLASE
DataSheet.hasOne(Class);

//HORARIO ALUMNO
StudentSchedule.belongsTo(Student);

//HORARIO PROFESOR
UserSchedule.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
