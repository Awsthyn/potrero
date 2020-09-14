import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getSubjects } from '../../redux/actions/subject'
import { getStudentDetail, putStudent } from '../../redux/actions/student';

import SubjectCheckbox from "./SubjectCheckbox"

export class StudentFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: props.student.firstName,
			lastName: props.student.lastName,
			phone: props.student.phone,
			email: props.student.email,
			tutor: props.student.tutor,
			difficulty: false,
			subject: props.student.subjects.map(s => s.id),
            weakness: props.student.weakness,
            interests: props.student.interests,
			strengths: props.student.strengths,
			motivations: props.student.motivations,
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
        this.props.putStudent(this.state)
        
		
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
        this.props.getSubjects()
    }

	render() {
		return (
            <>
            <h1 className="mb-3 mt-2">Datos del alumno</h1>
			<form className="mx-auto" style={{ width: '80vw' }} onSubmit={this.submitHandler}>
				<div className="mb-n1 d-flex flex-row form-group">
					<input
						style={{width: "550px"}}
						className="form-control"
						type="text"
						name="firstName"
						value={this.state.firstName}
						onChange={this.onChangeHandler}
					/>
					<input
						style={{width: "550px"}}
						className="form-control"
						type="text"
						name="lastName"
						value={this.state.lastName}
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="phone"
						value={this.state.phone}
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="tutor"
						value={this.state.tutor}
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="strengths"
						value={this.state.strengths}
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="weakness"
						value={this.state.weakness}
						onChange={this.onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						name="motivations"
						value={this.state.motivations}
						onChange={this.onChangeHandler}
					/>
				</div>
				<h3 className="text-center d-block mb-3">Materias que necesita cursar</h3>
				<div style={{width: "80vw"}} className="ml-auto mr-auto d-flex flex-wrap form-check form-check-inline">
                    {this.props.subjects.map( subject => {
                        return (
                        <SubjectCheckbox key = {subject.id} initialState={this.state.subject.includes(subject.id)? "checked" : false} subject={subject} onChange={this.onCheckboxClicked} required/>
                        )}
                    )}
                </div>
				<input style={{fontSize: "1.5em",width: "300px", backgroundColor: "#492BC4"}} className="text-white btn btn-lg" value="Agregar" type="submit" />
			</form>
            </>
		);
	}
}

const mapStateToProps = (state) => ({
    subjects: state.subjects.subjects,
    studentDetail: state.students.studentDetail
});

const mapDispatchToProps = (dispatch) => {
	return {
        getSubjects: () => dispatch(getSubjects()),
        getStudentDetail: (id) => dispatch(getStudentDetail(id)),
		putStudent: (student) => dispatch(putStudent(student)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentFile));