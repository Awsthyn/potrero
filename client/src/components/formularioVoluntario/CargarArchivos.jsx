import React, {Component} from 'react';
import {postVoluntary} from '../../redux/actions/voluntary.js';
import {connect} from 'react-redux';
import TerminosYcondiciones from './TerminosYCondiciones';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import styles from './VoluntarioForm.module.css';
import style1 from './Materias.module.css';

class CargarArchivos extends Component {
	constructor(props) {
		super();
		this.state = {
			info: new FormData(),
			checked: false,
			validate: {},
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleOnFileChange = this.handleOnFileChange.bind(this);
		this.handleCheked = this.handleCheked.bind(this);
	}

	handleOnChange(e) {
		const field = e.target;
		this.state.info.append(field.name, field.value);
		this.setState({...this.state, info: this.state.info});
	}

	handleOnFileChange = e => {
		const field = e.target;
		this.state.info.append(field.name, field.files[0]);
		this.setState({...this.state, info: this.state.info});
	};
	handleSend(e) {
		e.preventDefault();
		swal({
			title: '¿Estas seguro?',
			text: 'Antes de enviar tu solicitud verifica que tus datos sean correctos!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willSend => {
			if (willSend) {
				let data = JSON.parse(localStorage.getItem('datos'));
				let schedule = JSON.parse(localStorage.getItem('schedule'));
				let materias = JSON.parse(localStorage.getItem('materias'));
				Object.entries(data).forEach(dato => {
					this.state.info.append(dato[0], dato[1]);
				});
				this.props.postVoluntary(this.state.info, materias, schedule);
				localStorage.removeItem('datos');
				localStorage.removeItem('schedule');
				localStorage.removeItem('materias');
				localStorage.removeItem('nivel');
				this.props.history.push('/voluntarios/confirmacion');
				swal('Tu solicitud ha sido enviada!', {
					icon: 'success',
				});
			} else {
				swal('Solicitud no enviada');
			}
		});
	}
	handleCheked(e) {
		this.setState({checked: e.target.checked});
	}
	render() {
		let control;
		return (
			<div className={styles.formInput}>
				<label className={styles.cargarArchivos}>
					<span className={styles.zarasa} > 
						<span className="material-icons" id={styles.icon}>
							add_to_photos
						</span>
						<small className={styles.letras}>CV (Formato .pdf)</small>
					</span>
					<input
						style={{display: 'none'}}
						className={styles.input}
						name="cv"
						type="file"
						accept=".pdf"
						onChange={e => {
							this.handleOnFileChange(e);
							this.setState({validate: {...this.state.validate, [e.target.name]: e.target.value}});
						}}
					/>
				</label>
				<br></br>
				<label className={styles.cargarArchivos}>
					<span className={styles.zarasa} > 
						<span className="material-icons" id={styles.icon}>
							add_to_photos
						</span>
						<small className={styles.letras}>Frente del DNI </small>
					</span>
					<input
						style={{display: 'none'}}
						className={styles.input}
						name="frontDNI"
						type="file"
						accept=".png, .jpg, .jpeg"
						placeholder="fdzgdfgfdgfd"
						onChange={e => {
							this.handleOnFileChange(e);
							this.setState({validate: {...this.state.validate, [e.target.name]: e.target.value}});
						}}
					/>
				</label >
				<span style={{color: '#c2c2c2'}}> * </span>
					<small> Formato .png, .jpg o .jpeg </small> 
				<br></br>
				<label className={styles.cargarArchivos}>
					<span className={styles.zarasa} > 
						<span className="material-icons" id={styles.icon}>
							add_to_photos
						</span>
						<small className={styles.letras}>Reverso del DNI </small>
					</span>
					<input
						style={{display: 'none'}}
						className={styles.input}
						name="backDNI"
						type="file"
						accept=".png, .jpg, .jpeg"
						onChange={e => {
							this.handleOnFileChange(e);
							this.setState({validate: {...this.state.validate, [e.target.name]: e.target.value}});
						}}
					/>
				</label>{' '}
				<span style={{color: '#c2c2c2'}}> * </span>
					<small> Formato .png, .jpg o .jpeg </small>
				<br></br>
				<small style={{display: 'block'}}>Linkedin</small>
				<input
					style={{width: '80%', marginTop: '1%', display: 'inline'}}
					className={styles.input}
					name="linkedin"
					placeholder="ej: www.linkedin.com/tu_cuenta/"
					type="text"
					id="standard-basic6"
					onChange={e => {
						this.handleOnChange(e);
						this.setState({validate: {...this.state.validate, [e.target.name]: e.target.value}});
					}}
				/>
				<p style={{color: '#c2c2c2', fontSize: '13px', marginTop: '15px'}}> obligatorio * </p>
				<br></br>
				<input
					type="checkbox"
					name="terminos"
					value="terminos"
					onClick={e => this.handleCheked(e)}
				/>
				<TerminosYcondiciones />
				<div style={{display: 'flex', alignItems: 'center'}}>
					<div onClick={() => this.props.history.push('/voluntarios/materias')}>
						<svg
							viewBox="0 0 16 16"
							className={styles.leftArrow}
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
							/>
						</svg>
					</div>
					{(!this.state.validate.linkedin && !this.state.validate.cv) ||
					!this.state.validate.frontDNI ||
					!this.state.validate.backDNI ||
					!this.state.checked
						? (control = true)
						: false}
					<Button
						disabled={control ? true : false}
						variant="contained"
						style={({marginTop: '6%'}, control ? {backgroundColor: '#c2c2c2'} : null)}
						id={style1.botonEnviar}
						type="submit"
						value="Submit"
						onClick={e => this.handleSend(e)}>
						Enviar
						<span style={{margin: '10px'}} className="material-icons">
							arrow_forward
						</span>
					</Button>
				</div>
			</div>
		);
	}
}

export default connect(null, {postVoluntary})(CargarArchivos);
