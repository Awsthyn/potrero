const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Student = sequelize.define('student', {
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
        tutor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {//En caso de true desplegar una nueva lista )? 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        weakness: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        strengths: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        interests: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        motivations: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });
    Student.createInstanceFromBody = function ({ firstName, lastName, phone, email, tutor, difficulty, typeOfDifficulty, weakness, strengths, interests, motivations}) {
        return User.create({
            firstName,
            lastName,
            phone,
            email,
            tutor,
            difficulty,
            weakness,
            strengths,
            interests,
            motivations
        });
    };
}
