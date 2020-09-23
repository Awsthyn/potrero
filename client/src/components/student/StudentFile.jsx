import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubjects } from '../../redux/actions/subject'
import { putStudent } from '../../redux/actions/student';

import SubjectCheckbox from "./SubjectCheckbox"
import StrengthCheckbox from "./StrengthCheckbox";
import WeakCheckbox from "./WeaknessCheckbox";

export class StudentFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.student.id,
			firstName: props.student.firstName,
			lastName: props.student.lastName,
			phone: props.student.phone,
			email: props.student.email,
			tutor: props.student.tutor,
			difficulty: false,
			subjectsId: props.student.subjects.map(s => s.id),
			weakness: props.student.weakness,
			interests: props.student.interests,
			strengths: props.student.strengths,
			motivations: props.student.motivations,
		};
		this.subjects = this.props.subjects
		this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
		this.onWeakCheckboxClicked = this.onWeakCheckboxClicked.bind(this);
		this.onStrengthCheckboxClicked = this.onStrengthCheckboxClicked.bind(this);
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
		this.props.putStudent(this.state)
			.then(() => window.location = '/admin/estudiantes')
	};

	onCheckboxClicked(subject, isChecked) {
		if (isChecked) {
			this.setState({
				subjectsId: [...this.state.subjectsId, subject.id]
			})
		} else {
			this.setState({
				subjectsId: this.state.subjectsId.filter(s => s !== subject.id)
			})
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

	componentDidMount() {
		this.props.getSubjects()
	}

	render() {
		return (
			<>
				{console.log('STATE', this.state)}
				<h1 className="mb-3 mt-2">Datos del alumno</h1>
				<form className="card p-4 mx-auto" style={{ width: '85vw' }} onSubmit={this.submitHandler}>
					<div className="mb-n1 d-flex flex-row form-group">
						<label>Nombre del alumno
					<input
								style={{ width: "40vw" }}
								className="form-control mr-4"
								type="text"
								name="firstName"
								value={this.state.firstName}
								onChange={this.onChangeHandler}
							/>
						</label>
						<label>Apellido del alumno
					<input
								style={{ width: "40vw" }}
								className="form-control"
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={this.onChangeHandler}
							/>
						</label>
					</div>
					<div className="mb-4 d-flex flex-row form-group">
						<label>Teléfono del alumno
					<input style={{ width: "40vw" }}
								className="form-control mr-4"
								type="text"
								name="phone"
								value={this.state.phone}
								onChange={this.onChangeHandler}
							/>
						</label>
						<label>Email del alumno
					<input style={{ width: "40vw" }}
								className="form-control"
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.onChangeHandler}
							/>
						</label>
					</div>
					<div className="mt-4 form-group">
						<label>Nombre y apellido del tutor
					<input style={{ width: "81.5vw" }}
								className="form-control"
								type="text"
								name="tutor"
								value={this.state.tutor}
								onChange={this.onChangeHandler}
							/>
						</label>
					</div>
					<div className="mt-n2 mb-4 d-flex flex-row form-group">
						<label>Teléfono del tutor
					<input style={{ width: "40vw" }}
								className="form-control mr-4"
								type="text"
								name="tutorPhone"
								placeholder="Teléfono del tutor"
								onChange={this.onChangeHandler}
							/>
						</label>
						<label>Email del tutor
					<input style={{ width: "40vw" }}
								className="form-control"
								type="text"
								name="tutorEmail"
								placeholder="Email del tutor"
								onChange={this.onChangeHandler}
							/>
						</label>
					</div>
					<div className="form-group">
						<label style={{ fontSize: "1.7em" }} htmlFor="nivelEducativo">Nivel educativo</label>
						<select className="form-control" id="nivelEducativo">
							<option>1er grado</option>
							<option>2do grado</option>
							<option>3er grado</option>
							<option>4to grado</option>
							<option>5to grado</option>
						</select>
					</div>
					<h3 className="text-center d-block mb-3">Materias que tiene que aprender</h3>
					<div style={{ width: "80vw" }} className="ml-auto mr-auto d-flex flex-wrap form-check form-check-inline">
						{this.props.subjects.map(subject => {
							return (
								<SubjectCheckbox key={subject.id} initialState={this.state.subjectsId.includes(subject.id) ? "checked" : false} subject={subject} onChange={this.onCheckboxClicked} required />
							)
						}
						)}
					</div>
					<h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene FACILIDAD</h3>
					<div style={{ minHeight: "150px", width: "80vw" }} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
						{Array.isArray(this.state.subjectsId) && this.state.subjectsId.length > 0 ? this.state.subjectsId.map(subject => {
							if (this.state.weakness.includes(subject) === false) return (
								<StrengthCheckbox key={subject + 'strength'} initialState={this.state.strengths.includes(subject) ? "checked" : false} subject={this.props.subjects.find(e => e.id === subject)} onChange={this.onStrengthCheckboxClicked} required />
							)
						}

						) : <h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>}
					</div>
					<h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene DIFICULTAD</h3>
					<div style={{ minHeight: "150px", width: "80vw" }} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
						{Array.isArray(this.state.subjectsId) && this.state.subjectsId.length > 0 ? this.state.subjectsId.map(subject => {
							if (this.state.strengths.includes(subject) === false) return (
								<WeakCheckbox key={subject + 'weak'} initialState={this.state.weakness.includes(subject) ? "checked" : false} subject={this.props.subjects.find(e => e.id === subject)} onChange={this.onWeakCheckboxClicked} required />
							)
							else return null
						}

						) : <h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>}
					</div>
					<div className="form-group">
						<label>Motivaciones del alumno
					<input style={{ width: "80vw" }}
								className="form-control"
								type="text"
								name="motivations"
								value={this.state.motivations}
								onChange={this.onChangeHandler}
							/>
						</label>
					</div>
					<div className="form-group">
						<label>Intereses del alumno
					<input style={{ width: "80vw" }}
								className="form-control"
								type="text"
								name="interests"
								placeholder="Intereses del alumno..."
								onChange={this.onChangeHandler}
							/>
						</label>
					</div>
					<input style={{ fontSize: "1.5em", width: "300px", backgroundColor: "#492BC4" }} className="align-self-center text-white btn btn-lg" value="Confirmar cambios" type="submit" />
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	subjects: state.subjects.subjects,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getSubjects: () => dispatch(getSubjects()),
		putStudent: (student) => dispatch(putStudent(student)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentFile));