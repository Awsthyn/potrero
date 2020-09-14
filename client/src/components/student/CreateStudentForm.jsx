import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postStudent } from '../../redux/actions/student';

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
            weakness: 'lorem ipsum',
            interests: "lorem ipsum",
			strengths: 'lorem ipsum',
			motivations: 'lorem ipsum',
		};
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
	render() {
		return (
            <>
            <h1 className="mb-3">Formulario para alta de alumno</h1>
			<form className="mx-auto" style={{ width: '800px' }} onSubmit={this.submitHandler}>
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
				<input className="btn btn-info" value="Agregar" type="submit" />
			</form>
            </>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		postStudent: (student) => dispatch(postStudent(student)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);
