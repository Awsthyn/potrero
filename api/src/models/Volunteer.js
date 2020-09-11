const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Volunteer = sequelize.define('volunteer', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
        validate: {
            isEmail: true
        }
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    adviser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
  });
  Volunteer.createInstanceFromBody = function ({ firstName, lastName, birthday, phone, email, linkedin, adviser }) {
    return User.create({
      firstName,
      lastName,
      birthday,
      phone,
      email,
      linkedin,
      adviser
    });
};
};


////
