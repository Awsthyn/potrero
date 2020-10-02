import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { postStudent } from '../../redux/actions/student';
import { getAcademicLevels } from '../../redux/actions/academicLevel';
import { getSubjects } from '../../redux/actions/subject';
import SubjectCheckbox from './SubjectCheckbox';
// import StrengthCheckbox from './StrengthCheckbox';
import LevelEducation from './LevelEducation';
import TypeOfDifficultyCheckbox from './TypeOfDifficulty';
import DaysContainer from './DaysContainer';
import style from './CreateStudentForm.module.css';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
moment.locale('es');

export class CreateStudentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: null,
			lastName: null,
			phone: null,
			email: null,
			tutorFirstName: null,
			tutorLastName: null,
			tutorEmail: null,
			tutorPhone: null,
			interests: null,
			motivations: null,
			observations: null,
			scheduleStudent: null,
			subjectsId: [],
			academicLevel: null,
			isLevelSelect: false,
			validar: false,
		};
		this.subjects = null;
		this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
		this.onChangeSchedule = this.onChangeSchedule.bind(this);
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
				this.setState({ validar: this.state[prop] ? this.state.validar + 1 : this.state.validar, [prop]: 'Ingrese un e-mail válido' })
			:
				this.setState({ validar: !this.state[prop] ? this.state.validar - 1 : this.state.validar, [prop]: null })
		}

		else if(name === 'phone' || name === 'tutorPhone'){
			value.length < 10 ?
				this.setState({ validar: this.state[prop] ? this.state.validar + 1 : this.state.validar, [prop]: 'El número debe tener como mínimo 10 dígitos' })
			: // Si se genera un error en alguno de los campos de entrada y ese error todavia es null a validar le sumo 1 y seteo el error a la propiedad
				this.setState({ validar: !this.state[prop] ? this.state.validar - 1 : this.state.validar, [prop]: null })
		}

		// (!this.state.firstName || !this.state.lastName ||
		// !this.state.email || ! this.state.phone ||
		// !this.state.tutorFirstName || !this.state.tutorLastName ||
		// !this.state.tutorEmail || !this.state.tutorPhone ||
		// !this.state.interests || !this.state.motivations) ?
		// this.setState({validar: false})
		// :
		// this.setState({validar: true})
	
		this.setState({ [name]: value });
	};
	submitHandler = (event) => {
		event.preventDefault();
		let dataToSend = this.state;
		dataToSend.scheduleStudent = this.props.schedule;
		this.props.postStudent(dataToSend);
	};

	selectedGrade() {
		this.setState({ isLevelSelect: true });
	}

	onCheckboxClicked(subjects, isChecked) {
		if (isChecked) {
			this.setState({ isLevelSelect: true });
			this.setState({
				subjectsId: [...this.state.subjectsId, subjects.id],
			});
		} else {
			this.state.subjectsId.length > 0
				? this.setState({
						subjectsId: this.state.subjectsId.filter((s) => s !== subjects.id),
				  })
				: this.setState({ isLevelSelect: false });
		}
	}

	onChangeSchedule(schedule) {
		this.setState({ scheduleStudent: schedule });
	}
	componentDidMount() {
		this.props.getAcademicLevels();
		this.props.getSubjects();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.educationLevel !== this.props.educationLevel) {
			this.setState({ educationLevel: this.props.educationLevel });
		}
	}

	render() {
		return (
			<div className={style.createStudent}>
				<form className={`${style.formStudent}`} onSubmit={this.submitHandler}>
					<div className={style.container}>
						<h1 className="mb-3 mt-2" style={{ fontWeight: '500', paddingBottom: '5%' }}>
							Formulario para alta de alumno
						</h1>
						<label className={style.labelDatos}>Datos del Alumno</label>
						<div className="d-flex flex-row form-group" style={{}}>
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span>
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="firstName"
								placeholder="Nombre del alumno..."
								onKeyUp={this.onChangeHandler}
							/>
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span>
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="lastName"
								placeholder="Apellido del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="mt-n2 mb-4 d-flex flex-row form-group">
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="phone"
								placeholder="Teléfono del alumno..."
								onChange={this.onChangeHandler}
							/> 
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="email"
								placeholder="Email del alumno..."
								onChange={this.onChangeHandler}
							/> 
						</div>
					</div>

					<div className={style.container}>
						<label className={style.labelDatos}>Datos del Tutor</label>
						<div className="d-flex flex-row form-group">
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorFirstName"
								placeholder="Nombre del tutor..."
								onChange={this.onChangeHandler}
							/>
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorLastName"
								placeholder="Apellido del tutor..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="mt-n2 mb-4 d-flex flex-row form-group">
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorPhone"
								placeholder="Teléfono del tutor"
								onChange={this.onChangeHandler}
							/>
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								type="text"
								name="tutorEmail"
								placeholder="Email del tutor"
								onChange={this.onChangeHandler}
							/>
						</div>
					</div>
					<div className="form-group" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
						<label style={{ fontSize: '1.7em', width: '65vw' }} htmlFor="nivelEducativo">
							Grado alcanzado
						</label>
						<select
							className={style.select}
							id="nivelEducativo"
							onChange={(e) => {
								this.setState({ academicLevel: e.target.value });
								this.selectedGrade(e.target.value)
							}}
						>
							<option selected='selected' disabled='disabled'>
								--Seleccione Grado--
							</option>
							{this.props.academicLevels.length > 0 &&
								this.props.academicLevels
									.sort((a, b) => (a.numericLevel > b.numericLevel ? 1 : -1))
									.map((e) => (
										<option key={e.id + e.name} id={e.id} value={e.id} level={e.numericLevel}>
											{e.name}
										</option>
									))}
						</select>
					</div>
					{
						this.state.isLevelSelect ?
						(
							<div>
							<h3 className="text-center d-block mb-3">Materias que tiene que aprender</h3>
					<div
						style={{ width: '65vw', display: 'flex', justifyContent: 'center' }}
						className="ml-auto mr-auto d-flex flex-wrap form-check form-check-inline"
					>
						{this.props.subjects?.map((subject) => {
							return (
								<SubjectCheckbox
									key={subject.id}
									initialState={this.state.subjectsId?.includes(subject.id) ? true : false}
									subject={subject}
									onChange={this.onCheckboxClicked}
									required
								/>
							);
						})}
					</div>
					<div className={style.containerDays}>
						<h3>Horarios disponibles para las tutorías</h3>
						<DaysContainer className={style.days} uploadParentState={this.onChangeSchedule} />
					</div>
					<div className={style.container}>
						<div className="form-group">
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								style={{ width: '95%' }}
								type="text"
								name="motivations"
								placeholder="Motivaciones del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<span style={{color: "#c2c2c2", paddingTop:'15px', paddingRight:'5px'}} > * </span> 
							<input
								spellCheck="false"
								autoComplete="off"
								className={style.input}
								style={{ width: '95%' }}
								type="text"
								name="interests"
								placeholder="Intereses del alumno..."
								onChange={this.onChangeHandler}
							/>
						</div>
						</div>
							<p style={{color: "#c2c2c2", fontSize: '13px', marginTop: '15px'}}> obligatorio * </p> 
						</div>
						)
						:
						<div style={{color:'red', fontSize:'1.5em'}}>
							Para poder continuar es necesario que seleccione el grado academico del alumno.
							
						</div>
					}
					<div className={style.containerBtn}>
						<svg onClick={() => window.history.go(-1)} viewBox="0 0 10 10" class="VoluntarioForm_leftArrow__1ya4q" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
						</svg>
						<button
						// disabled={this.state.validar}
						className={style.btnAgregar}
						>Agregar Alumno</button>
              		</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	academicLevels: state.academic.academicLevels,
	schedule: state.studentForm,
	subjects: state.subjects.subjects,
});

const mapDispatchToProps = (dispatch) => {
	return {
		postStudent: (student) => dispatch(postStudent(student)),
		getAcademicLevels: () => dispatch(getAcademicLevels()),
		getSubjects: () => dispatch(getSubjects()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);
