const server = require('express').Router();
const isAuthenticated = require('./authenticate').isAuthenticated;

// TRAEMOS LOS STUDENTS DE LA BASE DE DATOS
const {
	Student,
	TypeOfDifficulty,
	Subject,
	AcademicLevel,
	TODXStudent,
	SubjectXStudent,
	StudentSchedule,
	Class,
} = require('../db.js');

// TRAEMOS SEQUELIZE
const Sequelize = require('sequelize');

server.get('/', (req, res) => {
	// BUSCA TODOS LOS STUDENTS Y LOS DEVUELVE COMO JSON (ARRAY DE OBJETOS)
	Student.findAll({
		attributes: {
			exclude: [
				'createdAt',
				'updatedAt',
				'phone',
				'email',
				'tutor',
				'difficulty',
				'weakness',
				'strengths',
				'interests',
				'motivations',
			],
		},
		include: [
			{
				model: TypeOfDifficulty,
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			},
			{
				model: Subject,
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
				include: [
					{
						model: AcademicLevel,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'educationLevelId'],
						},
					},
				],
			},
			{
				model: StudentSchedule,
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			},
		],
	})
		.then((students) => {
			// OPERADOR TERNARIO, QUE SE FIJA SI EL ARRAY DE OBJETOS "STUDENTS" ESTÁ VACÍO. ASÍ
			// RESPONDE CON UN MENSAJE, O SINO, DEVUELVE EL ARRAY CON LOS STUDENTS DENTRO.
			!students.length ? res.json('No hay alumnos todavía.') : res.json(students);
		})
		.catch((err) => {
			// ENVÍA UN ERROR EN CASO DE QUE HAYA INCONVENIENTES.
			res.json(err);
		});
});
//BUSCA TODOS LOS ESTUDIANTES RELACIONADOS CON UN ASESROR

server.get('/user/:userId', (req, res) => {
  Student.findAll({
    include: [{
      model: Class, 
      where: {
        userId: req.params.userId
    }}]
  }).then(students => res.send(students))
  .catch(error => res.send(error))
})
// BUSCA UN STUDENT EN ESPECÍFICO Y ENVÍA SUS DATOS.
server.get('/:id', (req, res) => {
	// BUSCA AL STUDENT.

	Promise.all([
		Student.findOne({
			where: {
				id: req.params.id,
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
			include: [
				{
					model: TypeOfDifficulty,
					attributes: {
						exclude: ['createdAt', 'updatedAt'],
					},
				},
				{
					model: Subject,
					attributes: {
						exclude: ['createdAt', 'updatedAt'],
					},
					include: [
						{
							model: AcademicLevel,
							attributes: {
								exclude: ['createdAt', 'updatedAt', 'educationLevelId'],
							},
						},
					],
				},
				{
					model: StudentSchedule,
					attributes: {
						exclude: ['createdAt', 'updatedAt'],
					},
				},
			],
		}),
		Class.findAll({
			where: { studentId: req.params.id },
			include: {
				model: Subject,
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			},
		}),
	])
		.then((studentFound) => {
			// SI ENCUENTRA AL STUDENT, ENVÍA SUS DATOS. O SINO, ENVÍA UN MENSAJE DE ERROR.
			if (!studentFound) res.json('El student no existe.');
			else {
				let studentData = studentFound[0];
				studentData['dataValues'].classes = studentFound[1];
				res.json(studentData);
			}
		})
		.catch((err) => {
			// SI HAY UN ERROR, LO ENVÍA.
			res.json(err);
		});
});

server.post('/', (req, res) => {
	let student;
	Student.create(req.body)
		.then((studentCreated) => {
			student = studentCreated;
			return StudentSchedule.bulkCreate(
				req.body.scheduleStudent.schedule.map((e) => {
					return {
						studentId: student.id,
						timeFrame: [e.start, e.end],
						nameWeekDay: e.nameWeekDay,
					};
				})
			);
		})
		.then(() => {
			return SubjectXStudent.bulkCreate(
				req.body.subjectsId.map((e) => {
					return {
						studentId: student.id,
						subjectId: e,
					};
				})
			);
		}) //Hay q asociar estudiante con grado!!!
    /*.then(() => student.setAcademicLevel(req.body.academicLevel))*/ 
    .then(() => Student.findByPk(student.id))
		.then((data) => res.json(data));
});

server.put('/:id', (req, res) => {
	const { subjectsId } = req.body;
	// BUSCA Y MODIFICA AL STUDENT ENCONTRADO.
	SubjectXStudent.destroy({ where: { studentId: req.params.id } })
		.then(() =>
			SubjectXStudent.bulkCreate(
				subjectsId.map((s) => {
					return { subjectId: s, studentId: req.params.id };
				})
			)
		)
		.then(() => Student.update(req.body, { where: { id: req.params.id } }))
		.then(() => {
			return (
				Student.findOne({
					where: {
						id: req.params.id,
					},
					include: [
						{
							model: TypeOfDifficulty,
						},
						{
							model: Subject,
						},
					],
				})
					// UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
					.then((studentWithChanges) => {
						res.json(studentWithChanges);
					})
			);
		})
		.catch((err) => {
			res.json(err);
		});
});

//BORRADO LÓGICO
// En lugar de eliminar un estudiante lo que hacemos es cambiarle el status a false
// Y así poder filtrar solamente por estudiantes activos y no perder la info por si
// mas adelante vulelve a la fundación.
server.put('/:id/changestatus', (req, res) => {
	Student.update({ isActive: req.body.isActive }, { where: { id: req.params.id } })
		.then(() => {
			return (
				Student.findOne({
					where: {
						id: req.params.id,
					},
					include: [
						{
							model: TypeOfDifficulty,
						},
						{
							model: Subject,
						},
					],
				})
					// UNA VEZ HECHO LOS CAMBIOS, ENVÍA SUS DATOS CON LA ACTUALIZACIÓN QUE HAYA REALIZADO.
					.then((studentWithChanges) => {
						res.json(studentWithChanges);
					})
			);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = server;
