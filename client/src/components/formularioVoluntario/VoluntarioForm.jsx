import React from 'react';
import {Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import style from './VoluntarioForm.module.css';

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
		localStorage.setItem('datos', JSON.stringify(this.state.info));
		this.setState(function () {
			return {redirect: true};
		});

		// this.props.addSchedule();
		// handleOnClick(e) {
		// 	e.preventDefault();
		// 	swal({
		// 		title: "¿Estas seguro?",
		// 		text: "Antes de enviar tu solicitud verifica que tus datos sean correctos!",
		// 		icon: "warning",
		// 		buttons: true,
		// 		dangerMode: true,
		// 	  })
		// 	  .then((willDelete) => {
		// 		console.log(this.state.info)
		// 		if (willDelete) {
		// 			console.log(this.state.info)
		// 		  this.props.postVoluntary(this.state.info);
		// 	      //this.props.addSchedule();
		// 		  swal("Tu solicitud ha sido enviada!", {
		// 			icon: "success",
		// 		  });
		// 		} else {
		// 		  swal("Solicitud no enviada");
		// 		}
		// 	  });
	}

	render() {
	    //localStorage.clear();
		var control;
		if (this.state.redirect) {
			return <Redirect to="/voluntarios/horarios" />;
		}
		return (
			<div className={style.Formm} style={{justifyContent: 'center', display: 'flex'}}>
				<form>
					<div className="form-group">
						<small>Nombre</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="firstName"
							//label="Nombre"
							type="text"
							id="standard-basic1"
							onChange={e => this.handleOnChange(e)}
						/>
						<small>Apellido</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="lastName"
							//label="Apellido"
							type="text"
							id="standard-basic2"
							onChange={e => this.handleOnChange(e)}
						/>
						<small>Fecha de nacimiento</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="birthday"
							//label="Fecha de nacimiento"
							placeholder="fecha de nacimiento"
							type="date"
							id="standard-basic3"
							onChange={e => this.handleOnChange(e)}
						/>
						<small>Telefono</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="phone"
							//label="Telefono"
							type="number"
							id="standard-basic5"
							onChange={e => this.handleOnChange(e)}
						/>
						<small>E-mail</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="email"
							//label="E-mail"
							type="email"
							id="standard-basic4"
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
						className={style.skere}
						type="submit"
						value="Submit"
						onClick={() => this.handleOnClick()}>
						Continuar
					</Button>
				</form>
			</div>
		);
	}
}
