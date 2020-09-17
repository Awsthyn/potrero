import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSubjects } from '../../redux/actions/subject'
import { postStudent } from '../../redux/actions/student';

import SubjectCheckbox from "./SubjectCheckbox"
import StrengthCheckbox from "./StrengthCheckbox";
import WeakCheckbox from "./WeaknessCheckbox";


export class CreateStudentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: null,
			phone: null,
			email: null,
			tutor: null,
			tutorEmail: null,
			tutorPhone: null,
			difficulty: false,
			subjectsId: [],
            weakness: [],
            interests: "lorem ipsum",
			strengths: [],
			motivations: 'lorem ipsum',
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
        this.props.postStudent(this.state)
        
		
	};

	onCheckboxClicked(subject, isChecked) {
        if(isChecked){
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
        if(isChecked){
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
        if(isChecked){
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
        this.props.getSubjects();
    }

	render() {
		return (
            <>
            <h1 className="mb-3 mt-2">Formulario para alta de alumno</h1>
			<form className="mx-auto" style={{ width: '80vw' }} onSubmit={this.submitHandler}>
				<div className="mb-n1 d-flex flex-row form-group">
					<input
						style={{width: "40vw"}}
						className="form-control"
						type="text"
						name="firstName"
						placeholder="Nombre del alumno..."
						onChange={this.onChangeHandler}
					/>
					<input
						style={{width: "40vw"}}
						className="form-control"
						type="text"
						name="lastName"
						placeholder="Apellido del alumno..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="mb-4 d-flex flex-row form-group">
					<input style={{width: "40vw"}}
						className="form-control"
						type="text"
						name="phone"
						placeholder="Teléfono del alumno..."
						onChange={this.onChangeHandler}
					/>
					<input style={{width: "40vw"}}
						className="form-control"
						type="text"
						name="email"
						placeholder="Email del alumno..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="mt-4 form-group">
					<input
						className="form-control"
						type="text"
						name="tutor"
						placeholder="Nombre y apellido del tutor..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="mt-n2 mb-4 d-flex flex-row form-group">
					<input style={{width: "40vw"}}
						className="form-control"
						type="text"
						name="tutorPhone"
						placeholder="Teléfono del tutor"
						onChange={this.onChangeHandler}
					/>
					<input style={{width: "40vw"}}
						className="form-control"
						type="text"
						name="tutorEmail"
						placeholder="Email del tutor"
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
    			<label style={{fontSize: "1.7em"}} htmlFor="nivelEducativo">Nivel educativo</label>
    			<select className="form-control" id="nivelEducativo">
					<option>1er grado</option>
					<option>2do grado</option>
					<option>3er grado</option>
					<option>4to grado</option>
					<option>5to grado</option>
					</select>
				</div>
				<h3 className="text-center d-block mb-3">Materias que tiene que aprender</h3>
				<div style={{width: "80vw"}} className="ml-auto mr-auto d-flex flex-wrap justify-content-center form-check form-check-inline">
                    { Array.isArray(this.props.subjects)&& this.props.subjects.length > 0 ? this.props.subjects.map( subject => {
                        return (
                        <SubjectCheckbox key = {subject.id} initialState={false} subject={subject} onChange={this.onCheckboxClicked} required/>
                        )}
                    ) : null}
                </div>
				<h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene FACILIDAD</h3>
				<div style={{minHeight: "150px",width: "80vw"}} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
                    { Array.isArray(this.state.subjectsId)&& this.state.subjectsId.length > 0 ? this.state.subjectsId.map( subject => {
                    if(this.state.weakness.includes(subject) === false) return (
                        <StrengthCheckbox key = {subject+'strength'} initialState={false} subject={this.props.subjects.find(e => e.id === subject)} onChange={this.onStrengthCheckboxClicked} required/>
					)}
					
                    ) : <h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>}	
                </div>
				<h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene DIFICULTAD</h3>
				<div style={{minHeight: "150px",width: "80vw"}} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
                    { Array.isArray(this.state.subjectsId)&& this.state.subjectsId.length > 0 ? this.state.subjectsId.map( subject => {
                    if(this.state.strengths.includes(subject) === false) return (
                        <WeakCheckbox key = {subject+'weak'} initialState={false} subject={this.props.subjects.find(e => e.id === subject)} onChange={this.onWeakCheckboxClicked} required/>
					)
					else return null}
					
                    ) : <h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>}	
                </div>
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

				<input style={{fontSize: "1.5em",width: "300px", backgroundColor: "#492BC4"}} className="text-white btn btn-lg" value="Agregar" type="submit" />
			</form>
            </>
		);
	}
}

const mapStateToProps = (state) => ({
	subjects: state.subjects.subjects
});

const mapDispatchToProps = (dispatch) => {
	return {
		getSubjects: () => dispatch(getSubjects()),
		postStudent: (student) => dispatch(postStudent(student)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);
