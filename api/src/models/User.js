const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
            args: ["(.)"],
            msg: 'Inserte un valor dentro del password.'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state:{
        type: DataTypes.ENUM(['pendiente', 'aceptado', 'rechazado', 'admin']),
        defaultValue: 'pendiente',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  User.createInstanceFromBody = function ({ email, password, firstName, lastName, address, birthday, phone, linkedin, cv, isActive, state }) {
    return User.create({ // Preguntar si esta bien que sea User.create o tiene que ser Volunteer.create???
      email,
      password,
      firstName,
      lastName,
      address,
      birthday,
      phone,
      linkedin,
      cv,
      isActive,
      state
    });
  };
  // debe ser function para que funcione this.password
  User.prototype.isPasswordValid = function ( password ) {
    return bcrypt.compare(password, this.password)
    .then(isValid => isValid)
    .catch(err => {
        console.error('isPasswordValid:', err)
        return false
    })
  }
  const hashPassword = password => {
    return new Promise( (resolve, reject) => {
      bcrypt.hash(password, 8)
      .then(hash => resolve(hash))
      .catch(err=> reject(err))
    })
  }

  User.addHook('beforeCreate', (user, options, cb) => {
    // console.info("en el hook beforeCreate", user)
    return hashPassword(user.password).then(hash => user.password = hash)}
  )

  User.addHook('beforeUpdate', (user, options, cb) =>
  {
    // console.info("en el hook beforeUpdate:", user)
    return hashPassword(user.password).then(hash => user.password = hash)}
  )

  return User;
};
