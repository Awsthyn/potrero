const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const DataSheet = sequelize.define("dataSheet", {
    // ¿Cómo es tu relación con tu alumno?
    relation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // ¿Consideras que estás haciendo una diferencia a tu tutoreado?
    difference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // ¿Sentís que tu trabajo está siendo valorado?
    valued: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // ¿Qué tan motivado estás para seguir brindando apoyo escolar?
    assesorMotivation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // Asistencia del alumno
    assistance: {
      type: DataTypes.ENUM(
        "justificada",
        "no justificada",
        "tardanza",
        "presente"
      ),
      allowNull: false,
    },
    // Conexion de internet
    internetConnection: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // ¿Notaste difucultades en su desempeño?
    performance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // ¿Te gustaría seguir trabajando con tu alumno?
    stay: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // Alguien lo acompañó?
    someoneAccompaniesHim: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // Si es asi, cual es su nombre. A futuro puede ser un desplegable que se pueda elegir a la persona que lo registra o algun tutor a cargo.
    companionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //Comentarios especiales
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // En esta clase tuvo examen?
    hadExam: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // Si es así cual fue su nota?
    qualification: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    //Actitud del alumno
    attitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
  DataSheet.createInstanceFromBody = function ({
    relation,
    difference,
    valued,
    assesorMotivation,
    assistance,
    internetConnection,
    performance,
    stay,
    someoneAccompaniesHim,
    companionName,
    comments,
    hadExam,
    qualification,
    attitude,
  }) {
    return DataSheet.create({
      relation,
      difference,
      valued,
      assesorMotivation,
      assistance,
      internetConnection,
      performance,
      stay,
      someoneAccompaniesHim,
      companionName,
      comments,
      hadExam,
      qualification,
      attitude,
    });
  };
};
