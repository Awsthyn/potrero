import React from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './VoluntarioForm.module.css';

export default class VolunteerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {},
			redirect: false,
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
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

	render() {
		var control;
		if (this.state.redirect) {
			return <Redirect to="/voluntarios/horarios" />;
		}
		return (
			<div>
				<span style={{position: 'absolute', top: '90px', right: '10%', width: '300px'}}>  
				<p> <strong>Sumate a nuestro equipo </strong></p>
				<span> Completa este formulario y nos pondremos en contacto con vos </span>
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
							// InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
						<input
							spellCheck="false"
							autoComplete="off"
							type="date"
							name="birthday"
							className={styles.input}
							// placeholder="fecha de nacimiento"
							// InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
						<input
							spellCheck="false"
							autoComplete="off"
							type="number"
							name="phone"
							className={styles.input}
							placeholder="Telefono"
							// InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/> 
						<input
							spellCheck="false"
							autoComplete="off"
							type="email"
							name="email"
							className={styles.input}
							placeholder="E-mail"
							// InputLabelProps={{ shrink: true }}
							aria-describedby="emailHelp"
							onChange={e => this.handleOnChange(e)}
						/>
					</div>
					{/* {!this.state.info.firstName ||
					!this.state.info.lastName ||
					!this.state.info.birthday ||
					!this.state.info.email ||
					!this.state.info.phone 
						? (control = true)
						: false} */}
					<Button
						disabled={control ? true : false}
						variant="contained"
						className={styles.testButton}
						id={styles.skere}
						type="submit"
						value="Submit"
						onClick={() => this.handleOnClick()}>
						Continuar
						<span style={{margin:"10px"}} className="material-icons">arrow_forward</span>
					</Button>
				</form>
			</div>
			</div>
		);
	}
}
