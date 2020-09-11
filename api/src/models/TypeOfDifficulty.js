const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const TypeOfDifficulty = sequelize.define('typeOfDifficulty', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    TypeOfDifficulty.createInstanceFromBody = function ({ name }) {
        return TypeOfDifficulty.create({
            name
        });
    };
}
