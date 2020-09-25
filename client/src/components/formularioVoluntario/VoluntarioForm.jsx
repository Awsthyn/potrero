import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import styles from './VoluntarioForm.module.css';
import { red } from '@material-ui/core/colors';

export default class VolunteerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {},
			redirect: false,
			error:"",
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
	}
	validateEmail(email){
		if(!/\S+@\S+\.\S+/.test(email)) {
			this.setState({error: "ingrese un e-mail valido"});
		} else {
			this.setState({error: ""});
		}
	}
	handleOnChange(e) {
		this.setState({
			info: {...this.state.info, [e.target.name]: e.target.value},
		});
	}
	handleOnClick() {
		if(this.state.info){
			localStorage.setItem('datos', JSON.stringify(this.state.info));
		}
		this.setState(function () {
			return {redirect: true};
		});	
	}
	componentDidMount(){
		if(!this.state.info.firstName){
			let newState = JSON.parse(localStorage.getItem('datos'))
			if(newState) this.setState({info: newState})
			else{ this.setState({info: {}})}
		}
	}
	render() {
		var control;
		if (this.state.redirect) {
			return <Redirect to="/voluntarios/horarios" />;
		}
		let años;
		return (
			<div>
				<span className={styles.frase}>  
				<p style={{fontSize:'1.3rem', margin: '0px', fontFamily: 'Poppins'}} ><strong>Sumáte a nuestro equipo </strong></p>
				<span style={{fontWeight: 100, color: 'gray', fontSize: '15px', fontFamily: 'Poppins'}} > Completá este formulario y nos pondremos en contacto con vos </span>
				</span>
			<div className={styles.Formm} >
				<form className={styles.formInput}>
					<div className={styles.formgroup}>
						<input
							spellCheck="false"
							autoComplete="off"
							type="text"
							name="firstName"
							className={styles.input}
							placeholder="Nombre"
							value={this.state.info.firstName}
							// inputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
						<input
							spellCheck="false"
							autoComplete="off"
							type="text"
							name="lastName"
							className={styles.input}
							placeholder="Apellido"
							value={this.state.info.lastName}
							// InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
					
						<input
							spellCheck="false"
							autoComplete="off"
							type="date"
							name="birthday"
							className={styles.input}
							value={this.state.info.birthday}
							// placeholder="fecha de nacimiento"
							// InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
							{
							this.state.info.birthday && 
							!moment(this.state.info.birthday?.split("-").join(""), "YYYYMMDD").fromNow().includes("años") || 
							parseInt(moment(this.state.info.birthday?.split("-").join(""), "YYYYMMDD").fromNow().slice(5,7)) < 17 
							? <p style={{fontSize: "10px", textAlign: 'left', marginLeft: '23px', position: 'absolute', color: 'red'}}>Debes ser mayor de 18 años</p> : null
						}
						
						<input
							spellCheck="false"
							autoComplete="off"
							type="number"
							name="phone"
							className={styles.input}
							placeholder="Telefono"
							value={this.state.info.phone}
							// InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/> 
						{
							this.state.info.phone && 
							(this.state.info.phone.toString().length < 8 ||
							this.state.info.phone.toString().length > 13)
							? <p style={{fontSize: "10px", textAlign: 'left', marginLeft: '23px', position: 'absolute', color: 'red'}}>Debes ingresar un número telefónico válido</p> : null	
						}
						<input
							spellCheck="false"
							autoComplete="off"
							type="email"
							name="email"
							className={styles.input}
							placeholder="E-mail"
							value={this.state.info.email}
							// InputLabelProps={{ shrink: true }}
							aria-describedby="emailHelp"
							onChange={e => {this.handleOnChange(e); this.validateEmail(e.target.value)}}
						/>
						{
							this.state.info.email && this.state.error
							? <p style={{fontSize: "10px", textAlign: 'left', marginLeft: '23px', position: 'absolute', color: 'red'}}>Ingrese un e-mail valido</p> : null
						}
					</div>
					{!this.state.info.firstName ||
					!this.state.info.lastName ||
					!this.state.info.birthday ||
					!moment(this.state.info.birthday?.split("-").join(""), "YYYYMMDD").fromNow().includes("años") || 
					parseInt(moment(this.state.info.birthday?.split("-").join(""), "YYYYMMDD").fromNow().slice(5,7)) < 17 ||		
					!this.state.info.email ||
					!this.state.info.phone || 
					this.state.info.phone.toString().length < 8 ||
					this.state.info.phone.toString().length > 13 ||
					this.state.info.email && this.state.error
						? (control = true)
						: false}
						<div style={{display: 'flex', alignItems: 'center'}}> 
							<div onClick={() => this.props.history.push('/')} > 
								<svg viewBox="0 0 16 16" className={styles.leftArrow} style={{bottom: '19%'}} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
								</svg> 
							</div>
						<Button
							disabled={control ? true : false}
							style={control ? {backgroundColor: "#c2c2c2"} : null}
							variant="contained"
							className={styles.testButton}
							id={styles.skere}
							type="submit"
							value="Submit"
							onClick={() => this.handleOnClick()}>
							Continuar
							<span style={{margin:"10px"}} className="material-icons">arrow_forward</span>
						</Button>
					</div>
				</form>
			</div>
			</div>
		);
	}
}
