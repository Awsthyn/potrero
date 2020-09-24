import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { postStudent } from '../../redux/actions/student';
import { getEducationLevel } from '../../redux/actions/educationLevel';
import SubjectCheckbox from "./SubjectCheckbox"
import StrengthCheckbox from "./StrengthCheckbox";
import LevelEducation from "./LevelEducation";
import WeakCheckbox from "./WeaknessCheckbox";
import DaysContainer from "./DaysContainer";
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
			difficulty: false,
			weakness: [],
			interests: "lorem ipsum",
			strengths: [],
			motivations: 'lorem ipsum',
			observations: null,
			scheduleStudent: null,
			subjectsId: [],
			subjectsXLevel: [],
			academicLevels: null,
			isLevelSelect: false
		};
		this.subjects = null;
		this.educationLevel = this.props.educationLevel;
		this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
		this.onWeakCheckboxClicked = this.onWeakCheckboxClicked.bind(this);
		this.onStrengthCheckboxClicked = this.onStrengthCheckboxClicked.bind(this);
		this.onChangeSchedule = this.onChangeSchedule.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.showGrade = this.showGrade.bind(this);
		this.selectedGrade = this.selectedGrade.bind(this);
	}
	onChangeHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		console.log('NAME: ', name);
		console.log('VALUE: ', value);
		this.setState( { [name]: value } );
		console.log('THIS.STATE: ', this.state)
	};
	submitHandler = (event) => {
		event.preventDefault();
		this.props.postStudent(this.state)
	};

	showGrade(academicLevels, isChecked) {
		isChecked ? this.setState({ academicLevels: academicLevels }) : this.setState({ academicLevels: null });
	}

	selectedGrade(selectGrade) {
		const selected = this.state.academicLevels.filter(grade => Number(grade.id) === Number(selectGrade));
		this.setState({ subjectsXLevel: selected[0].subjects });
	}

	onCheckboxClicked(subjects, isChecked) {
		if (isChecked) {
			this.setState({ isLevelSelect: true });
			this.setState({
				subjectsId: [...this.state.subjectsId, subjects.id]
			})
		}
		else {
			this.state.subjectsId.length > 0 ?
			this.setState({
				subjectsId: this.state.subjectsId.filter(s => s !== subjects.id)
			})
			:
			this.setState({ isLevelSelect: false })
		}
	}

	onStrengthCheckboxClicked(subject, isChecked) {
		if (isChecked) {
			this.setState({
				strengths: [...this.state.strengths, subject.id]
			})
		} else {
			this.setState({
				strengths: this.state.strengths.filter(s => s !== subject.id)
			})
		}
	}
	onWeakCheckboxClicked(subject, isChecked) {
		if (isChecked) {
			this.setState({
				weakness: [...this.state.weakness, subject.id]
			})
		} else {
			this.setState({
				weakness: this.state.weakness.filter(s => s !== subject.id)
			})
		}
	}

	onChangeSchedule(schedule) {
		this.setState({ scheduleStudent: schedule })
	}


	componentDidMount() {
		this.props.getEducationLevel();
	}

	render() {
		return (
			<div style={{ marginLeft: 250, marginTop: 50, marginBottom: 50, marginRight: 50 }}>
				<>
					<form className="card p-4 shadow mx-auto" style={{ width: '70vw' }} onSubmit={this.submitHandler}>
						<h1 className="mb-3 mt-2">Formulario para alta de alumno</h1>
						<div>
							<label style={{ fontSize: "1.2em", marginBottom: '15px' }}>Datos del Alumno</label>
							<div className="d-flex flex-row form-group">
								<input
									style={{ width: "34vw" }}
									className="form-control mr-4"
									type="text"
									name="firstName"
									placeholder="Nombre del alumno..."
									onChange={this.onChangeHandler}
								/>
								<input
									style={{ width: "34vw" }}
									className="form-control"
									type="text"
									name="lastName"
									placeholder="Apellido del alumno..."
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="mt-n2 mb-4 d-flex flex-row form-group">
								<input style={{ width: "34vw" }}
									className="form-control mr-4"
									type="text"
									name="phone"
									placeholder="Teléfono del alumno..."
									onChange={this.onChangeHandler}
								/>
								<input style={{ width: "34vw" }}
									className="form-control"
									type="text"
									name="email"
									placeholder="Email del alumno..."
									onChange={this.onChangeHandler}
								/>
							</div>
						</div>
						<div>
							<label style={{ fontSize: "1.2em", marginBottom: '15px' }}>Datos del Tutor</label>
							<div className="mt-n2 mb-4 d-flex flex-row form-group">
								<input
									style={{ width: "34vw" }}
									className="form-control mr-4"
									type="text"
									name="tutorFirstName"
									placeholder="Nombre del tutor..."
									onChange={this.onChangeHandler}
								/>
								<input style={{ width: "34vw" }}
									className="form-control"
									type="text"
									name="tutorLastName"
									placeholder="Apellido del tutor..."
									onChange={this.onChangeHandler}
								/>
							</div>
						</div>
						<div className="mt-n2 mb-4 d-flex flex-row form-group">
							<input
								style={{ width: "34vw" }}
								className="form-control mr-4"
								type="text"
								name="tutorPhone"
								placeholder="Teléfono del tutor"
								onChange={this.onChangeHandler}
							/>
							<input style={{ width: "34vw" }}
								className="form-control"
								type="text"
								name="tutorEmail"
								placeholder="Email del tutor"
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<label style={{ fontSize: "1.7em" }} htmlFor="nivelEducativo">Nivel educativo</label>
							<div style={{ display: 'flex', justifyContent: 'center' }} className="form-group">
								{
									this.educationLevel ?
										this.props.educationLevel.map(level => <LevelEducation initialState={false} level={level} onChange={this.showGrade} required />)
										:
										'No se encontraron niveles educativos'
								}
							</div>
							{
								this.state.academicLevels ?
									<div className="form-group">
										<label style={{ fontSize: "1.7em" }} htmlFor="nivelEducativo">Grado máximo cursado</label>
										<div style={{ display: 'flex', justifyContent: 'center' }} className="form-group">
											<select onChange={(e) => this.selectedGrade(e.target.value)}>
												{this.state.academicLevels ? this.state.academicLevels.map(academic => <option value={academic.id}>{academic.name}</option>) : 'NO EDUCATION LEVEL'}
											</select>
										</div>
									</div>
									:
									<div style={{ color: 'red' }}>Debe seleccionar un nivel educativo para poder seleccionar el grado académico</div>
							}
						</div>
						{
							this.state.subjectsXLevel.length > 0 ?
								<div>
									<h3 className="text-center d-block mb-3">Materias que tiene que aprender</h3>
									<div style={{ width: "70vw" }} className="ml-auto mr-auto d-flex flex-wrap justify-content-center form-check form-check-inline">
										{
											Array.isArray(this.state.subjectsXLevel) && this.state.subjectsXLevel.length > 0 ? this.state.subjectsXLevel.map(subject => {
												return (
													<SubjectCheckbox key={subject.id} initialState={false} subject={subject} onChange={this.onCheckboxClicked} required />
												)
											}) : null
										}
									</div>
									<h6 className="mt-4 mb-n2">A continuación puede hacer una selección de las materias que considera que el alumno tiene facilidad o dificultad para aprender. No es necesario clasificar a todas las materias.</h6>
									{
										this.state.isLevelSelect ?
											<div>
												<h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene <span style={{ color: "#8CC63E" }}>FACILIDAD</span></h3>

												<div style={{ minHeight: "150px", width: "70vw" }} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
													{
														(
															Array.isArray(this.state.subjectsId) && this.state.subjectsId.length > 0) ? 
																this.state.subjectsId.map(subject => {
																	if (this.state.weakness.includes(subject) === false) return (
																		<StrengthCheckbox key={subject + 'strength'} initialState={false} subject={this.state.subjectsXLevel.find(e => Number(e.id) === Number(subject))} onChange={this.onStrengthCheckboxClicked} required />
																	)
																}
														) 
														: 
														<h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>
													}
												</div>
												<h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene <span style={{ color: "#c63e3e" }}>DIFICULTAD</span></h3>
												<div style={{ minHeight: "150px", width: "70vw" }} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
													{
														(Array.isArray(this.state.subjectsId) && this.state.subjectsId.length > 0) ? 
															this.state.subjectsId.map(subject => {
																if (this.state.strengths.includes(subject) === false) return (
																	<WeakCheckbox key={subject + 'weak'} initialState={false} subject={this.state.subjectsXLevel.find(e => e.id === subject)} onChange={this.onWeakCheckboxClicked} required />
																)
																else return null;
															}
														) 
														: 
														<h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>
													}
												</div>
											</div>
											:
											<div></div>
									}
								</div>
								:
								<div style={{ color: 'blue' }}>No se encontraron materias para el grado seleccionado</div>
						}
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								name="motivations"
								placeholder="Motivaciones del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								name="interests"
								placeholder="Intereses del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<textarea name="observations" onChange={this.onChangeHandler} className="form-control" style={{ width: "66.4vw" }} placeholder="Observaciones y/o comentarios..." />
						</div>
						<h3>Horarios disponibles para las tutorías</h3>
						<DaysContainer uploadParentState={this.onChangeSchedule} />
						<input style={{ fontSize: "1.5em", width: "300px", backgroundColor: "#492BC4" }} className="align-self-center text-white btn btn-lg" value="Agregar" type="submit" />

					</form>
				</>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	educationLevel: state.educationLevel.educationLevel
});

const mapDispatchToProps = (dispatch) => {
	return {
		postStudent: (student) => dispatch(postStudent(student)),
		getEducationLevel: () => dispatch(getEducationLevel())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);