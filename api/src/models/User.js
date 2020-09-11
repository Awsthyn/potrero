const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
var bcrypt = require('bcrypt');

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
            allowNull: false,
            validate: {
                is: {
                    args: ["(.)"],
                    msg: 'Inserte un valor dentro del password.'
                }
            }
        }
    });
    User.createInstanceFromBody = function ({ email, password }) {
        return User.create({
            email,
            password
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

    return User
}
