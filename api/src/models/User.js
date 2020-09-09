var Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
var bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('user', {
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
                    msg: 'Campo description - Debe ser una palabra'
                }
            }
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: "voluntario",
        },
    }),
}
