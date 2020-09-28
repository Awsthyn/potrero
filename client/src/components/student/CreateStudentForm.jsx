import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { postStudent } from '../../redux/actions/student';
import { getEducationLevel } from '../../redux/actions/educationLevel';
import SubjectCheckbox from './SubjectCheckbox';
import StrengthCheckbox from './StrengthCheckbox';
import LevelEducation from './LevelEducation';
import WeakCheckbox from './WeaknessCheckbox';
import DaysContainer from './DaysContainer';
import style from './CreateStudentForm.module.css';
moment.locale('es');

export class CreateStudentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: null,
			phone: null,
			email: null,
			tutorFirstName: null,
			tutorLastName: null,
			tutorEmail: null,
			tutorPhone: null,
			difficulty: false,
			weakness: [],
			interests: 'lorem ipsum',
			motivations: 'lorem ipsum',
			observations: null,
			scheduleStudent: null,
			subjectsId: [],
			subjectsXLevel: [],
			academicLevels: null,
			isLevelSelect: false,
			educationLevel : null
		};
		this.subjects = null;
		this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
		this.onChangeSchedule = this.onChangeSchedule.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.showGrade = this.showGrade.bind(this);
		this.selectedGrade = this.selectedGrade.bind(this);
	}
	onChangeHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		this.setState({ [name]: value });
	};
	submitHandler = (event) => {
		event.preventDefault();
		this.props.postStudent(this.state);
	};

	showGrade(levels, isChecked) {
		if(isChecked){
			this.setState({educationLevel: [levels]});
			this.setState({ academicLevels: levels.academicLevels });
			this.setState({ isLevelSelect: false });
		}
		else{
			this.setState( {educationLevel: this.props.educationLevel});
			this.setState( { subjectsXLevel: [] } );
			this.setState({ academicLevels: null });
			this.setState({ isLevelSelect: true });
		}
	}

	selectedGrade(selectGrade) {
		const selected = this.state.academicLevels.filter(
			(grade) => Number(grade.id) === Number(selectGrade)
		);
		this.setState({ subjectsXLevel: selected[0].subjects });
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
		this.props.getEducationLevel();
	}

	componentDidUpdate(prevProps){
		if(prevProps.educationLevel !== this.props.educationLevel){
			this.setState( {educationLevel: this.props.educationLevel})
		}
	}

	render() {
		return (
			<div
				className={style.createStudent}
			>
				<form
					className={`${style.formStudent}`}
					onSubmit={this.submitHandler}
				>
					<div className={style.container}>
					<h1 className='mb-3 mt-2' style = {{fontWeight : '500', paddingBottom: '5%'}}>Formulario para alta de alumno</h1>
						<label className={style.labelDatos}>
							Datos del Alumno
              			</label>
							<div className='d-flex flex-row form-group'>
								<input 
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='firstName'
									placeholder='Nombre del alumno...'
									onChange={this.onChangeHandler}
								/>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='lastName'
									placeholder='Apellido del alumno...'
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className='mt-n2 mb-4 d-flex flex-row form-group'>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='phone'
									placeholder='Teléfono del alumno...'
									onChange={this.onChangeHandler}
								/>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='email'
									placeholder='Email del alumno...'
									onChange={this.onChangeHandler}
								/>
							</div>
						</div>

						<div className={style.container}>
							<label className={style.labelDatos}>
								Datos del Tutor
              				</label>
							<div className='d-flex flex-row form-group'>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='tutorFirstName'
									placeholder='Nombre del tutor...'
									onChange={this.onChangeHandler}
								/>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='tutorLastName'
									placeholder='Apellido del tutor...'
									onChange={this.onChangeHandler}
								/>
							</div>
						
					
							<div className='mt-n2 mb-4 d-flex flex-row form-group'>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='tutorPhone'
									placeholder='Teléfono del tutor'
									onChange={this.onChangeHandler}
								/>
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									type='text'
									name='tutorEmail'
									placeholder='Email del tutor'
									onChange={this.onChangeHandler}
								/>
							</div>
							</div>
						
						<div className='form-group'>
							<label style={{ fontSize: '1.7em', marginTop: '4%' }} htmlFor='nivelEducativo'>
								Nivel educativo
              				</label>
							<div
								className={style.containerLevel}
							>
								{this.state.educationLevel
									? this.state.educationLevel.map((level) => (
										<LevelEducation
											initialState={false}
											className={style.levelSelected}
											level={level}
											onChange={this.showGrade}
											required
										/>
									))
									: 'No se encontraron niveles educativos'}
							</div>
							{
								this.state.academicLevels ?
									(
										<div className='form-group'>
											<label style={{ fontSize: '1.7em' }} htmlFor='nivelEducativo'>
												Grado máximo cursado
											</label>
											<div
												style={{ display: 'flex', justifyContent: 'center' }}
												className='form-group'
											>
												<select
													style={{display: 'flex', justifyContent: 'center', alignSelf:'center'}}
													onChange={(e) => this.selectedGrade(e.target.value)}
												>
													<option selected='selected' disabled='disabled'>
														--Seleccione Nivel--
													</option>
													{this.state.academicLevels
														? this.state.academicLevels.map((academic) => (
															<option value={academic.id}>{academic.name}</option>
														))
														: 'NO EDUCATION LEVEL'}
												</select>
											</div>
											{
												this.state.subjectsXLevel.length > 0 ?
													(
														<div>
															<h3 style = {{marginTop: '5%'}} className='text-center d-block mb-3'>
																Materias que tiene que aprender
															</h3>
															<div
																style={{ width: '100%', marginTop: '3%' }}
																className='ml-auto mr-auto d-flex flex-wrap justify-content-center form-check form-check-inline'
															>
																{
																	(Array.isArray(this.state.subjectsXLevel) &&
																		this.state.subjectsXLevel.length > 0) ?
																		this.state.subjectsXLevel.map((subject) => {
																			return (
																				<SubjectCheckbox
																					key={subject.id}
																					initialState={false}
																					subject={subject}
																					onChange={this.onCheckboxClicked}
																					required
																				/>
																			);
																		})
																		: null
																}
															</div>
														</div>
													)
													:
													(
														(
															this.state.subjectsXLevel.length === 0
															&&
															this.state.academicLevels.length > 0
															&&
															this.state.isLevelSelect === true 
														)
														?
														(
															<div style={{ color: 'red' }}>Lo sentimos! No se encontraron materias para ese ciclo lectivo :( {console.log(':(',this.state.subjectsId.length)}</div>
														)
														:
														(
															<div style={{ color: 'red', fontSize: '14px' }}>
																Debe seleccionar un GRADO / AÑO LECTIVO para ver las materias disponibles
																{console.log('*****¡',this.state.subjectsId, ' ', this.state.academicLevels, ' ', this.state.isLevelSelect)}
															</div>
														)
													)
													}
												</div>
													)
													:
													(
														<div style={{ color: 'red', fontSize: '14px' }}>
															Debe seleccionar un nivel educativo para poder seleccionar el
															grado académico
														</div>
													)
									}
						</div>
						<div className={style.container}>
							<div className='form-group' >
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									style={{ width: '95%' }}
									type='text'
									name='motivations'
									placeholder='Motivaciones del alumno...'
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className='form-group' >
								<input
									spellCheck="false"
									autoComplete="off"
									className={style.input}
									style={{ width: '95%' }}
									type='text'
									name='interests'
									placeholder='Intereses del alumno...'
									onChange={this.onChangeHandler}
								/>
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
						</div>
						<div className={style.containerDays}>
							<h3>Horarios disponibles para las tutorías</h3>
							<DaysContainer className={style.days} uploadParentState={this.onChangeSchedule} />
							<input
								style={{
									fontSize: '1.2em',
									width: '18%',
									backgroundColor: '#492BC4',
								}}
								className={style.btnAgregar}
								value='Agregar Alumno'
								type='submit'
							/>
						</div>
					</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	educationLevel: state.educationLevel.educationLevel,
});

const mapDispatchToProps = (dispatch) => {
	return {
		postStudent: (student) => dispatch(postStudent(student)),
		getEducationLevel: () => dispatch(getEducationLevel()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentForm);