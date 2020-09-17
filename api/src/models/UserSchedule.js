const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	const UserSchedule = sequelize.define('userSchedule', {
		startTime: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		endTime: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nameWeekDay: {
            type: DataTypes.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes"),
            allowNull: true
		},
		createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
	});
};
