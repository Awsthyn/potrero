import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubjects } from '../../redux/actions/subject';
import { putStudent, getStudentDetail } from '../../redux/actions/student';
import { getAcademicLevels } from '../../redux/actions/academicLevel';
import { getDifficulties } from '../../redux/actions/difficulty.js';
import SubjectCheckbox from './SubjectCheckbox';
import TypeOfDifficultyCheckbox from './TypeOfDifficulty';
import styles from './StudentFile.module.css';

export class StudentFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
			tutorFirstName: null,
			tutorLastName: null,
			tutorEmail: null,
			tutorPhone: null,
      educationLevel: null,
      subjects: null,
      subjectsId: null,
      interests: null,
      motivations: null,
      todXStudent: null,
      erroremail: null,
      errortutorEmail: null
    };
    this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const prop = `error${name}`;

    if(!(/\S+@\S+\.\S+/.test(value))) {
      console.log([prop]);
      this.setState({ [prop]: 'Ingrese un e-mail válido'});
    } else {
        this.setState({ [prop]: null});
      }

    this.setState({ [name]: value });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props
      .putStudent(this.state)
      .then(() => this.props.history.push('/admin/estudiantes'));
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

  // validateEmail(email){
	// 	if(!/\S+@\S+\.\S+/.test(email)) {
	// 		this.setState({error: 'Ingrese un e-mail válido'});
	// 	} else {
	// 		this.setState({error: null});
	// 	}
	// }

  componentDidMount() {
    this.props.getStudentDetail(this.props.id)
    .then((res) => {
      let student = res.data;
      this.setState({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        email: student.email,
        tutorFirstName: student.tutorFirstName,
        tutorLastName: student.tutorLastName,
        tutorEmail: student.tutorEmail,
        tutorPhone: student.tutorPhone,
        educationLevel: student.educationLevel,
        subjectsId: student?.subjects?.map(e => e.id),
        interests: student.interests,
        motivations: student.motivations,
        todXStudent: student?.typeOfDifficulties?.map(e => e.id)
      })
    });

    this.props.getSubjects();
    this.props.getAcademicLevels();
    this.props.getDifficulties();
  }

  componentDidUpdate(prevProps){
    if(prevProps.subjects !== this.props.subjects){
      this.setState({subjects: this.props.subjects})
    }
  }

  render() {
    return (
      <div className={styles.editStudent}>
        <form className={styles.formStudent} onSubmit={this.submitHandler}>
          <div className={styles.container}>
            <h1
              className='mb-3 mt-2'
              style={{ fontWeight: '500', paddingBottom: '1%' }}
            >
              Formulario para editar alumno
            </h1>
            <label className={styles.labelDatos}>Datos del Alumno</label>
            <div className='d-flex flex-row form-group'>
              <label className={styles.tag}>
                Nombre
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='firstName'
                  defaultValue={this.props.studentDetail.firstName}
                  onChange={this.onChangeHandler}
                />
              </label>
              <label className={styles.tag}>
                Apellido
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='lastName'
                  defaultValue={this.props.studentDetail.lastName}
                  onChange={this.onChangeHandler}
                />
              </label>
            </div>
            <div className='mt-n2 mb-4 d-flex flex-row form-group'>
              <label className={styles.tag}>
                Teléfono
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='phone'
                  defaultValue={this.props.studentDetail.phone}
                  onChange={this.onChangeHandler}
                />
              </label>
              <label className={styles.tag}>
                E-mail
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='email'
                  defaultValue={this.props.studentDetail.email}
                  onChange={(event) => {this.onChangeHandler(event)}}
                /> 
                  {
                    this.state.email && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.erroremail}</p>)
                  }
              </label>
            </div>
          </div>
          <div className={styles.container}>
            <label className={styles.labelDatos}>Datos del Tutor</label>
            <div className='mb-n1 d-flex flex-row form-group'>
              <label className={styles.tag}>
                Nombre
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='tutorFirstName'
                  defaultValue={this.props.studentDetail.tutorFirstName}
                  onChange={this.onChangeHandler}
                />
              </label>
              <label className={styles.tag}>
                Apellido
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='tutorLastName'
                  defaultValue={this.props.studentDetail.tutorLastName}
                  onChange={this.onChangeHandler}
                />
              </label>
            </div>
            <div className='mb-4 d-flex flex-row form-group'>
              <label className={styles.tag}>
                Teléfono
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='tutorPhone'
                  defaultValue={this.props.studentDetail.tutorPhone}
                  onChange={this.onChangeHandler}
                />
              </label>
              <label className={styles.tag}>
                E-mail
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='tutorEmail'
                  defaultValue={this.props.studentDetail.tutorEmail}
                  onChange={(event) => {this.onChangeHandler(event)}}
                />
                  {
                    this.state.tutorEmail && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errortutorEmail}</p>)
                  }
              </label>
            </div>
          </div>

          <div className={styles.container}>
            <div className='form-group'>
              <label className={styles.extras}>
                Motivaciones del alumno
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='motivations'
                  defaultValue={this.props.studentDetail.motivations}
                  onChange={this.onChangeHandler}
                />
              </label>
            </div>
            <div className='form-group'>
              <label className={styles.extras}>
                Intereses del alumno
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='interests'
                  defaultValue={this.props.studentDetail.interests}
                  onChange={this.onChangeHandler}
                />
              </label>
            </div>
          </div>

          <div className={styles.container}>
            <label style={{ fontSize: '1.7em' }} htmlFor='nivelEducativo'>
              Grado alcanzado
            </label>
            <select
              className={styles.select}
              id='nivelEducativo'
              onChange={(e) =>
                this.setState({ educationLevel: e.target.value })
              }
            >
              <option selected='selected' disabled='disabled'>
                --Seleccione Grado--
              </option>
              {this.props.academicLevels.length > 0 &&
                this.props.academicLevels
                  .sort((a, b) => (a.numericLevel > b.numericLevel ? 1 : -1))
                  .map((e) => (
                    <option id={e.id} value={e.id} level={e.numericLevel}>
                      {e.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className={styles.containerSubjects}>
            <h3 className='text-center d-block mb-3'>
              Materias que tiene que aprender
            </h3>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
              className='ml-auto mr-auto d-flex flex-wrap form-check form-check-inline'
            >
              {
                this.props.subjects?.map((subject) => {
                  return (
                    <SubjectCheckbox
                      key={subject.id}
                      initialState={
                        this.state.subjectsId?.includes(subject.id)
                      }
                      subject={subject}
                      onChange={this.onCheckboxClicked}
                      required
                    />
                  );
                })
              }
            </div>
          </div>
          <div className={styles.containerSubjects}>
            <h3 className='text-center d-block mb-3'>
              Tipos de dificultades que presenta
            </h3>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
              className='ml-auto mr-auto d-flex flex-wrap form-check form-check-inline'
            >
              {
                this.props.difficulties?.map((difficulty) => {
                  return (
                    <TypeOfDifficultyCheckbox
                      key={difficulty.id}
                      initialState={
                        this.state.todXStudent?.includes(difficulty.id)
                      }
                      subject={difficulty}
                      onChange={this.onCheckboxClicked}
                      required
                    />
                  );
                })
              }
            </div>
          </div>
          <h4 className='text-danger'>
            Feature de modificación de horarios en construcción. Para hacer un
            cambio de esa temática, comunicarse con HENRY.
          </h4>
          <div className={styles.containerBtns}>
            <svg onClick={() => window.history.go(-1)} viewBox="0 0 10 10" class="VoluntarioForm_leftArrow__1ya4q" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
            </svg>
            <input
              className={styles.btnConfirmar}
              value='Confirmar cambios'
              type='submit'
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentDetail: state.students.studentDetail,
  subjects: state.subjects.subjects,
  difficulties: state.difficulty.difficulties,
  academicLevels: state.academic.academicLevels,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentDetail: (id) => dispatch(getStudentDetail(id)),
    getSubjects: () => dispatch(getSubjects()),
    getDifficulties: () => dispatch(getDifficulties()),
    getAcademicLevels: () => dispatch(getAcademicLevels()),
    putStudent: (student) => dispatch(putStudent(student)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentFile));