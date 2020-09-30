import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubjects } from '../../redux/actions/subject';
import { putStudent, getStudentDetail } from '../../redux/actions/student';
import { getAcademicLevels } from '../../redux/actions/academicLevel';
import style from './CreateStudentForm.module.css';

import SubjectCheckbox from './SubjectCheckbox';
import styles from './StudentFile.module.css';

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
      subjectsId:
        this.props.studentDetail.subjects &&
        this.props.studentDetail.subjects.map((e) => e.id),
      interests: this.props.studentDetail.interests,
      motivations: this.props.studentDetail.motivations,
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

  handleOnClick(){
    
  }

  componentDidMount() {
    this.props.getStudentDetail(this.props.match.params.id);
    this.props.getSubjects();
    this.props.getAcademicLevels();
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
                  onChange={this.onChangeHandler}
                />
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
                  name='email'
                  defaultValue={this.props.studentDetail.tutorEmail}
                  onChange={this.onChangeHandler}
                />
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
              {this.props.studentDetail.subjects &&
                this.props.subjects.map((subject) => {
                  return (
                    <SubjectCheckbox
                      key={subject.id}
                      initialState={
                        this.state.subjectsId &&
                        this.state.subjectsId.includes(subject.id)
                          ? 'checked'
                          : false
                      }
                      subject={subject}
                      onChange={this.onCheckboxClicked}
                      required
                    />
                  );
                })}
            </div>
          </div>
          <h4 className='text-danger'>
            Feature de modificación de horarios en construcción. Para hacer un
            cambio de esa temática, comunicarse con HENRY.
          </h4>
          <input
            className={styles.btnConfirmar}
            onClick={handleOnClick}
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
  academicLevels: state.academic.academicLevels,
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