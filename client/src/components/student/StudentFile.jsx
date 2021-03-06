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
      subjectsId: null,
      interests: null,
      motivations: null,
      todXStudent: null,
      errorfirstName: null,
      errorlastName: null,
      erroremail: null,
      errortutorFirstName: null,
      errortutorLastName: null,
      errortutorEmail: null,
      errorphone: null,
      errortutorPhone: null,
      errorinterests: null,
      errormotivations: null,
      validar: 0, // Declaro el state validar para habilitar o desabilitar el boton de Confirmar cambios
      isLevelSelect: false,
    };
    this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.selectedGrade = this.selectedGrade.bind(this);
  }
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const prop = `error${name}`;

    if(name === 'email' || name === 'tutorEmail'){
      (!(/\S+@\S+\.\S+/.test(value)) || !value) ?
        this.setState({ validar: !this.state[prop] ? this.state.validar + 1 : this.state.validar, [prop]: 'Ingrese un e-mail válido' })
        :
        this.setState({ validar: this.state[prop] ? this.state.validar - 1 : this.state.validar, [prop]: null});
    }

    else if(name === 'phone' || name === 'tutorPhone'){
      value.length < 10 ?
      this.setState({ validar: !this.state[prop] ? this.state.validar + 1 : this.state.validar, [prop]: 'El número debe tener como mínimo 10 dígitos'})
      : // Si se genera un error en alguno de los campos de entrada y ese error todavia es null a validar le sumo 1 y seteo el error a la propiedad
      this.setState({ validar: this.state[prop] ? this.state.validar - 1 : this.state.validar, [prop]: null});
    }
    else{
      !value ?
      this.setState({ validar: !this.state[prop] ? this.state.validar + 1 : this.state.validar, [prop]: 'Campo Obligatorio'})
      :
      this.setState({ validar: this.state[prop] ? this.state.validar - 1 : this.state.validar, [prop]: null});
    }
    
    this.setState({ [name]: value });
  }

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

  selectedGrade() {
		this.setState({ isLevelSelect: true });
	}


  componentDidMount() {
    this.props.getStudentDetail(this.props.id);
    this.props.getSubjects();
    this.props.getAcademicLevels();
  }

  componentDidUpdate(prevProps){
    if (prevProps.studentDetail !== this.props.studentDetail){
      let student = this.props.studentDetail;
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
    }

  }

  render() {
    return (
      <div className={styles.editStudent}>
        <form className={styles.formStudent} onSubmit={this.submitHandler}>
            <h1
              className='mb-3 mt-2'
              style={{ fontWeight: '500' }}
            >
              Formulario para editar alumno
            </h1>
          <div className={styles.box}>
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
                  defaultValue={this.state.firstName}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  !this.state.firstName && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errorfirstName}</p>)
                }
              </label>
              <label className={styles.tag}>
                Apellido
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='lastName'
                  defaultValue={this.state.lastName}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  !this.state.lastName && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errorlastName}</p>)
                }
              </label>
            </div>
            <div className='mt-n2 mb-4 d-flex flex-row form-group'>
              <label className={styles.tag}>
                Teléfono
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='number'
                  name='phone'
                  defaultValue={this.state.phone}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  (this.state.phone || !this.state.phone) && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errorphone}</p>)
                }
              </label>
              <label className={styles.tag}>
                E-mail
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='email'
                  defaultValue={this.state.email}
                  onKeyUp={this.onChangeHandler}
                /> 
                  {
                    (this.state.email || !this.state.email) && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.erroremail}</p>)
                  }
              </label>
            </div>
          </div>
          <div className={styles.box}>
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
                  defaultValue={this.state.tutorFirstName}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  !this.state.tutorFirstName && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errortutorFirstName}</p>)
                }
              </label>
              <label className={styles.tag}>
                Apellido
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='tutorLastName'
                  onKeyUp={this.onChangeHandler}
                  defaultValue={this.state.tutorLastName}
                />
                {
                  !this.state.tutorLastName && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errortutorLastName}</p>)
                }
              </label>
            </div>
            <div className='mb-4 d-flex flex-row form-group'>
              <label className={styles.tag}>
                Teléfono
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='number'
                  name='tutorPhone'
                  defaultValue={this.state.tutorPhone}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  (this.state.tutorPhone || !this.state.tutorPhone) && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errortutorPhone}</p>)
                }
              </label>
              <label className={styles.tag}>
                E-mail
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='tutorEmail'
                  defaultValue={this.state.tutorEmail}
                  onKeyUp={this.onChangeHandler}
                />
                  {
                    (this.state.tutorEmail || !this.state.tutorEmail) && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errortutorEmail}</p>)
                  }
              </label>
            </div>
          </div>

          <div className={styles.box}>
            <div className='form-group'>
              <label className={styles.extras}>
                Motivaciones del alumno
                <input
                  spellCheck='false'
                  autoComplete='off'
                  className={styles.input}
                  type='text'
                  name='motivations'
                  defaultValue={this.state.motivations}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  !this.state.motivations && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errormotivations}</p>)
                }
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
                  defaultValue={this.state.interests}
                  onKeyUp={this.onChangeHandler}
                />
                {
                  !this.state.interests && (<p style={{fontSize: "15px", textAlign: 'left', position: 'absolute', color: 'red'}}>{this.state.errorinterests}</p>)
                }
              </label>
            </div>
          </div>

          <div className={styles.box}>
            <label style={{ fontSize: '1.7em', marginBottom:'10px', marginTop:'0' }} htmlFor='nivelEducativo'>
              Grado Academico
            </label>
            <select
              className={styles.select}
              id='nivelEducativo'
              onChange={(e) =>{
                this.setState({ educationLevel: e.target.value });
                this.selectedGrade(e.target.value);
              }
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
          {
            this.state.isLevelSelect ?
            (
                  <div className={styles.containerSubjects}>
                <h3 style={{margin: '1% auto 3% auto'}}>
                  Materias en las que necesita asistencia
                </h3>
                <span>Las materias en color violeta son en las que ya se esta inscripto el alumno</span>
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
                <div className={styles.containerBtns}>
                <svg onClick={() => window.history.go(-1)} viewBox="0 0 10 10" class="VoluntarioForm_leftArrow__1ya4q" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                </svg>
                <button
                  disabled={this.state.validar > 0 ? true : false}
                  className={styles.btnConfirmar}
                >Confirmar cambios</button>
              </div>
              </div>
            )
            :
            <div style={{color:'red', fontSize:'1.5em'}}>
              Para poder seleccionar las materias en las que se brindará apoyo al alumno, 
              es necesario que primero seleccione un grado academico.
            </div>
          }
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
    getStudentDetail: (id) => dispatch(getStudentDetail(id)),
    getSubjects: () => dispatch(getSubjects()),
    getAcademicLevels: () => dispatch(getAcademicLevels()),
    putStudent: (student) => dispatch(putStudent(student)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentFile));