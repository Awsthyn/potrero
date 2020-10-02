const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Student = sequelize.define("student", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // difficulty: {
    //   //En caso de true desplegar una nueva lista )?
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    // },
    // weakness: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
    // strengths: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
    interests: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    motivations: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  });
  Student.createInstanceFromBody = function ({
    firstName,
    lastName,
    phone,
    email,
    tutorFirstName,
    tutorLastName,
    tutorEmail,
    tutorPhone,
    // difficulty,
    // typeOfDifficulty,
    // weakness,
    // strengths,
    interests,
    motivations,
    isActive,
  }) {
    return Student.create({
      firstName,
      lastName,
      phone,
      email,
      tutorFirstName,
      tutorLastName,
      tutorEmail,
      tutorPhone,
      // difficulty,
      // weakness,
      // strengths,
      interests,
      motivations,
      isActive,
    });
  };
};
