const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	const UserSchedule = sequelize.define('userSchedule', {
		startTime: {
			type: DataTypes.TIME,
			allowNull: true,
		},
		endTime: {
			type: DataTypes.TIME,
			allowNull: true,
		},
		nameWeekDay: {
            type: DataTypes.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes"),
            allowNull: true
        }
	});
};
