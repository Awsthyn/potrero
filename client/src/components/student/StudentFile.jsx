import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubjects } from '../../redux/actions/subject';
import { putStudent, getStudentDetail } from '../../redux/actions/student';
import { getAcademicLevels } from '../../redux/actions/academicLevel';
import style from './CreateStudentForm.module.css';

import SubjectCheckbox from './SubjectCheckbox';

export class StudentFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: this.props.studentDetail.firstName,
      lastName: this.props.studentDetail.lastName,
      phone: this.props.studentDetail.phone,
      email: this.props.studentDetail.email,
			tutorFirstName: this.props.studentDetail.tutorFirstName,
			tutorLastName: this.props.studentDetail.tutorLastName,
			tutorEmail: this.props.studentDetail.tutorEmail,
			tutorPhone: this.props.studentDetail.tutorPhone,
      difficulty: this.props.studentDetail.difficulty,
      educationLevel: this.props.studentDetail.educationLevel,
      subjectsId: this.props.studentDetail.subjects && this.props.studentDetail.subjects.map(e => e.id),
      interests: this.props.studentDetail.interests,
      motivations: this.props.studentDetail.motivations
    };
    this.subjects = this.props.subjects;
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
    this.props
      .putStudent(this.state)
      .then(() => (this.props.history.push('/admin/estudiantes')))
  };

  onCheckboxClicked(subject, isChecked) {
    if (isChecked) {
      this.setState({
        subjectsId: [...this.state.subjectsId, subject.id],
      });
    } else {
      this.setState({
        subjectsId: this.state.subjectsId.filter((s) => s !== subject.id),
      });
    }
  }

  componentDidMount() {
    this.props.getStudentDetail(this.props.match.params.id);
    this.props.getSubjects();
    this.props.getAcademicLevels();
  }
  render() {
    return (
      <div
        style={{
          width: `calc(100% - ${400}px)`,
          marginTop: 100,
          fontFamily: 'Poppins',
          marginLeft: 300,
          justifyContent: 'center',
        }}
      >
        <h1 className='mb-3 mt-2'>Datos del alumno</h1>
        <form
          className='card p-4 mx-auto'
          style={{ width: '85vw' }}
          onSubmit={this.submitHandler}
        >
          <div className='mb-n1 d-flex flex-row form-group'>
            <label>
              Nombre del alumno
              <input
                style={{ width: '40vw' }}
                className='form-control mr-4'
                type='text'
                name='firstName'
                value={this.state.firstName}
                onChange={this.onChangeHandler}
              />
            </label>
            <label>
              Apellido del alumno
              <input
                style={{ width: '40vw' }}
                className='form-control'
                type='text'
                name='lastName'
                value={this.state.lastName}
                onChange={this.onChangeHandler}
              />
            </label>
          </div>
          <div
            className='mb-4 d-flex flex-row form-group'
            style={{ margin: '10px 0' }}
          >
            <label>
              Teléfono del alumno
              <input
                style={{ width: '40vw' }}
                className='form-control mr-4'
                type='text'
                name='phone'
                value={this.state.phone}
                onChange={this.onChangeHandler}
              />
            </label>
            <label>
              Email del alumno
              <input
                style={{ width: '40vw' }}
                className='form-control'
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.onChangeHandler}
              />
            </label>
          </div>
          <div className='mb-n1 d-flex flex-row form-group'>
            <label>
              Nombre del tutor
              <input
                style={{ width: '40vw' }}
                className='form-control mr-4'
                type='text'
                name='tutorFirstName'
                value={this.state.tutorFirstName}
                onChange={this.onChangeHandler}
              />
            </label>
            <label>
              Apellido del tutor
              <input
                style={{ width: '40vw' }}
                className='form-control'
                type='text'
                name='tutorLastName'
                value={this.state.tutorLastName}
                onChange={this.onChangeHandler}
              />
            </label>
          </div>
          <div
            className='mb-4 d-flex flex-row form-group'
            style={{ margin: '10px 0' }}
          >
            <label>
              Teléfono del tutor
              <input
                style={{ width: '40vw' }}
                className='form-control mr-4'
                type='text'
                name='phone'
                value={this.state.tutorPhone}
                onChange={this.onChangeHandler}
              />
            </label>
            <label>
              Email del tutor
              <input
                style={{ width: '40vw' }}
                className='form-control'
                type='text'
                name='email'
                value={this.state.tutorEmail}
                onChange={this.onChangeHandler}
              />
            </label>
          </div>
          <div className='form-group'>
            <label style={{ fontSize: '1.7em' }} htmlFor='nivelEducativo'>
             Grado alcanzado
            </label>
            <select className='form-control' id='nivelEducativo' onChange={e => this.setState({educationLevel: e.target.value})}>
            {this.props.academicLevels.length > 0 && this.props.academicLevels.sort((a, b) => (a.numericLevel > b.numericLevel) ? 1 : -1).map(e => <option id={e.id} value={e.id} level={e.numericLevel}>{e.name}</option>)}
            </select>
          </div>
          <h3 className='text-center d-block mb-3'>
            Materias que tiene que aprender
          </h3>
          <div
            style={{ width: '80vw', display:'flex', justifyContent:'center' }}
            className='ml-auto mr-auto d-flex flex-wrap form-check form-check-inline'
          >
            {
				this.props.studentDetail.subjects && this.props.subjects.map((subject) => {
				return (
					<SubjectCheckbox
					key={subject.id}
					initialState={
            this.state.subjectsId && this.state.subjectsId.includes(subject.id)
						? 'checked'
						: false
					}
					subject={subject}
					onChange={this.onCheckboxClicked}
					required
					/>
				);
				})
			}
          </div>
          <h4 className="text-danger">Feature de modificación de horarios en construcción. Para hacer un cambio de esa temática, comunicarse con HENRY.</h4>
          {/* <h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene FACILIDAD</h3>
					<div style={{ minHeight: "150px", width: "80vw" }} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
						{Array.isArray(this.state.subjectsId) && this.state.subjectsId.length > 0 ? this.state.subjectsId.map(subject => {
							if (this.state.weakness.includes(subject) === false) return (
								<StrengthCheckbox key={subject + 'strength'} initialState={this.state.strengths.includes(subject) ? "checked" : false} subject={this.props.subjects.find(e => e.id === subject)} onChange={this.onStrengthCheckboxClicked} required />
							)
						}

						) : <h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>}
					</div> */}
          {/* <h3 className="text-center d-block mt-3 mb-3">Materias para las que tiene DIFICULTAD</h3>
					<div style={{ minHeight: "150px", width: "80vw" }} className="ml-auto mr-auto d-flex justify-content-center flex-wrap form-check form-check-inline">
						{Array.isArray(this.state.subjectsId) && this.state.subjectsId.length > 0 ? this.state.subjectsId.map(subject => {
							if (this.state.strengths.includes(subject) === false) return (
								<WeakCheckbox key={subject + 'weak'} initialState={this.state.weakness.includes(subject) ? "checked" : false} subject={this.props.subjects.find(e => e.id === subject)} onChange={this.onWeakCheckboxClicked} required />
							)
							else return null
						}

						) : <h5 className="text-danger align-self-center">Seleccione materias para poder trabajar en este apartado</h5>}
					</div> */}
          <div className='form-group'>
            <label>
              Motivaciones del alumno
              <input
                style={{ width: '80vw' }}
                className='form-control'
                type='text'
                name='motivations'
                value={this.state.motivations}
                onChange={this.onChangeHandler}
              />
            </label>
          </div>
          <div className='form-group'>
            <label>
              Intereses del alumno
              <input
                style={{ width: '80vw' }}
                className='form-control'
                type='text'
                name='interests'
				        value={this.state.interests}
                placeholder='Intereses del alumno...'
                onChange={this.onChangeHandler}
              />
            </label>
          </div>
          <div className='form-group' >
								<textarea
									name='observations'
									onChange={this.onChangeHandler}
									className={style.textArea}
									style={{ width: '95%' }}
									placeholder='Observaciones y/o comentarios...'
								/>
							</div>
          <input
            style={{
              fontSize: '1.5em',
              width: '300px',
              backgroundColor: '#492BC4',
            }}
            className='align-self-center text-white btn btn-lg'
            value='Confirmar cambios'
            type='submit'
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentDetail: state.students.studentDetail,
  subjects: state.subjects.subjects,
  academicLevels: state.academic.academicLevels
});

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentDetail: (studentId) => dispatch(getStudentDetail(studentId)),
    getSubjects: () => dispatch(getSubjects()),
    getAcademicLevels: () => dispatch(getAcademicLevels()),
    putStudent: (student) => dispatch(putStudent(student)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentFile));
