import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSubjects } from '../../redux/actions/subject'
import { postStudent } from '../../redux/actions/student';

import SubjectCheckbox from "./SubjectCheckbox"

export class CreateStudentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: null,
			phone: null,
			email: null,
			tutor: null,
			difficulty: false,
			subject: [],
            weakness: 'lorem ipsum',
            interests: "lorem ipsum",
			strengths: 'lorem ipsum',
			motivations: 'lorem ipsum',
		};
		this.subjects = this.props.subjects
		this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
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
                subject: [...this.state.subject, subject.id]
            })
        } else {
            this.setState({
                subject: this.state.subject.filter(s => s !== subject.id)
            })
        }
    }

    componentDidMount() {
        this.props.getSubjects();
    }

	render() {
		return (
            <>
            <h1 className="mb-3">Formulario para alta de alumno</h1>
			<form className="mx-auto" style={{ width: '80vw' }} onSubmit={this.submitHandler}>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="firstName"
						placeholder="Nombre del alumno..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="lastName"
						placeholder="Apellido del alumno..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="phone"
						placeholder="Teléfono de contacto..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="email"
						placeholder="Email de contacto..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="tutor"
						placeholder="Nombre y apellido del tutor..."
						onChange={this.onChangeHandler}
					/>
				</div>
				<div style={{width: "80vw"}} className="ml-auto mr-auto d-flex flex-wrap form-check form-check-inline">
                    {this.props.subjects.map( subject => {
                        return (
                        <SubjectCheckbox key = {subject.id} initialState={false} subject={subject} onChange={this.onCheckboxClicked} required/>
                        )}
                    )}
                </div>
				<input className="btn btn-info" value="Agregar" type="submit" />
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