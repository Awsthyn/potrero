import React from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './VoluntarioForm.module.css';
// import styled from 'styled-components';
import { TextField, NoSsr } from '@material-ui/core';


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
	   //localStorage.clear();
		var control;
		if (this.state.redirect) {
			return <Redirect to="/voluntarios/horarios" />;
		}
		return (
			<div>
			<div className={styles.circles}>
			  <div className={styles.circleLila}>1</div><div className={styles.lineGray}></div> <div className={styles.circleGray}>2</div><div className={styles.lineGray}></div><div className={styles.circleGray}>3</div>
			</div>
			<div className={styles.Formm} >
				<form className={styles.formInput}>
					<div className={styles.formgroup}>
						<TextField
							className={styles.nombreVolunteer}
							name="firstName"
							label="Nombre"
							type="text"
							id="standard-basic1"
							InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
						<TextField
							className={styles.lastName}
							name="lastName"
							label="Apellido"
							type="text"
							id="standard-basic2"
							InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/>
						<TextField
							className={styles.dateText}
							name="birthday"
							label="Fecha de nacimiento"
							// placeholder="fecha de nacimiento"
							InputLabelProps={{ shrink: true }}
							type="date"
							// defaultValue="date"
							id="standard-basic3"
							
							onChange={e => this.handleOnChange(e)}
						/>
						<TextField
							className={styles.phoneVolunteer}
							name="phone"
							label="Telefono"
							type="number"
							id="standard-basic5"
							InputLabelProps={{ shrink: true }}
							onChange={e => this.handleOnChange(e)}
						/> 
						<TextField
							style={{width: '100%', marginTop: '1%', display: 'flex'}}
							name="email"
							label="E-mail"
							type="email"
							id="standard-basic4"
							InputLabelProps={{ shrink: true }}
							aria-describedby="emailHelp"
							onChange={e => this.handleOnChange(e)}
						/>
					</div>
					{!this.state.info.firstName ||
					!this.state.info.lastName ||
					!this.state.info.birthday ||
					!this.state.info.email ||
					!this.state.info.phone 
						? (control = true)
						: false}
					<Button
						disabled={control ? true : false}
						variant="contained"
						className={styles.testButton}
						id={styles.skere}
						type="submit"
						value="Submit"
						onClick={() => this.handleOnClick()}>
						Continuar
						<span style={{margin:"10px"}} className="material-icons">trending_flat</span>
					</Button>
				</form>
			</div>
			</div>
		);
	}
}
