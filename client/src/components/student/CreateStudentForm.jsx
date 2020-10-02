import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { postStudent } from '../../redux/actions/student';
import { getAcademicLevels } from '../../redux/actions/academicLevel';
import { getSubjects } from '../../redux/actions/subject';
import SubjectCheckbox from './SubjectCheckbox';
import LevelEducation from './LevelEducation';
import DaysContainer from './DaysContainer';
import style from './CreateStudentForm.module.css';
moment.locale('es');

export class CreateStudentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: null,
			phone: null,
			email: null,
			tutorFirstName: null,
			tutorLastName: null,
			tutorEmail: null,
			tutorPhone: null,
			interests: null,
			motivations: null,
			observations: null,
			scheduleStudent: null,
			subjectsId: [],
			academicLevel: null,
		};
		this.subjects = null;
		this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
		this.onChangeSchedule = this.onChangeSchedule.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	onChangeHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		this.setState({ [name]: value });
	};
	submitHandler = (event) => {
		event.preventDefault();
		let dataToSend = this.state;
		dataToSend.scheduleStudent = this.props.schedule;
		this.props.postStudent(dataToSend);
	};

	onCheckboxClicked(subjects, isChecked) {
		if (isChecked) {
			this.setState({ isLevelSelect: true });
			this.setState({
				subjectsId: [...this.state.subjectsId, subjects.id],
			});
		} else {
			this.state.subjectsId.length > 0
				? this.setState({
						subjectsId: this.state.subjectsId.filter((s) => s !== subjects.id),
				  })
				: this.setState({ isLevelSelect: false });
		}
	}

	onChangeSchedule(schedule) {
		this.setState({ scheduleStudent: schedule });
	}
	componentDidMount() {
		this.props.getAcademicLevels();
		this.props.getSubjects();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.educationLevel !== this.props.educationLevel) {
			this.setState({ educationLevel: this.props.educationLevel });
		}
	}

	render() {
		return (
			<div className={style.createStudent}>
				<form className={`${style.formStudent}`} onSubmit={this.submitHandler}>
					<div className={style.container}>
						<h1 className="mb-3 mt-2" style={{ fontWeight: '500', paddingBottom: '5%' }}>
							Formulario para alta de alumno
						</h1>
						<label className={style.labelDatos}>Datos del Alumno</label>
						<div className="d-flex flex-row form-group">
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="firstName"
								placeholder="Nombre del alumno..."
								onChange={this.onChangeHandler}
							/>
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="lastName"
								placeholder="Apellido del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="mt-n2 mb-4 d-flex flex-row form-group">
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="phone"
								placeholder="Teléfono del alumno..."
								onChange={this.onChangeHandler}
							/>
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="email"
								placeholder="Email del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
					</div>

					<div className={style.container}>
						<label className={style.labelDatos}>Datos del Tutor</label>
						<div className="d-flex flex-row form-group">
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorFirstName"
								placeholder="Nombre del tutor..."
								onChange={this.onChangeHandler}
							/>
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorLastName"
								placeholder="Apellido del tutor..."
								onChange={this.onChangeHandler}
							/>
						</div>

						<div className="mt-n2 mb-4 d-flex flex-row form-group">
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorPhone"
								placeholder="Teléfono del tutor"
								onChange={this.onChangeHandler}
							/>
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorEmail"
								placeholder="Email del tutor"
								onChange={this.onChangeHandler}
							/>
						</div>
					</div>
					<div className="form-group">
						<label style={{ fontSize: '1.7em', width: '65vw' }} htmlFor="nivelEducativo">
							Grado alcanzado
						</label>
						<select
							style={{ width: '65vw' }}
							className="form-control"
							id="nivelEducativo"
							onChange={(e) => this.setState({ academicLevel: e.target.value })}
						>
							{this.props.academicLevels.length > 0 &&
								this.props.academicLevels
									.sort((a, b) => (a.numericLevel > b.numericLevel ? 1 : -1))
									.map((e) => (
										<option key={e.id + e.name} id={e.id} value={e.id} level={e.numericLevel}>
											{e.name}
										</option>
									))}
						</select>
					</div>
					<h3 className="text-center d-block mb-3">Materias que tiene que aprender</h3>
					<div
						style={{ width: '65vw', display: 'flex', justifyContent: 'center' }}
						className="ml-auto mr-auto d-flex flex-wrap form-check form-check-inline"
					>
						{this.props.subjects?.map((subject) => {
							return (
								<SubjectCheckbox
									key={subject.id}
									initialState={this.state.subjectsId?.includes(subject.id) ? true : false}
									subject={subject}
									onChange={this.onCheckboxClicked}
									required
								/>
							);
						})}
					</div>
					<div className={style.containerDays}>
						<h3>Horarios disponibles para las tutorías</h3>
						<DaysContainer className={style.days} uploadParentState={this.onChangeSchedule} />
					</div>
					<div className={style.container}>
						<div className="form-group">
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								style={{ width: '95%' }}
								type="text"
								name="motivations"
								placeholder="Motivaciones del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								style={{ width: '95%' }}
								type="text"
								name="interests"
								placeholder="Intereses del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<textarea
								name="observations"
								onChange={this.onChangeHandler}
								className={style.textArea}
								style={{ width: '95%' }}
								placeholder="Observaciones y/o comentarios..."
							/>
						</div>
					</div>
					<input
							style={{
								fontSize: '1.2em',
								width: '200px',
								backgroundColor: '#492BC4',
							}}
							className={style.btnAgregar}
							value="Agregar Alumno"
							type="submit"
						/>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	academicLevels: state.academic.academicLevels,
	schedule: state.studentForm,
	subjects: state.subjects.subjects,
});

const mapDispatchToProps = (dispatch) => {
	return {
		postStudent: (student) => dispatch(postStudent(student)),
		getAcademicLevels: () => dispatch(getAcademicLevels()),
		getSubjects: () => dispatch(getSubjects()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);
