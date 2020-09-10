const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

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
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    User.createInstanceFromBody = function ({ email, password, rol }) {
        return User.create({
            email,
            password,
            rol
        });
    };
}

