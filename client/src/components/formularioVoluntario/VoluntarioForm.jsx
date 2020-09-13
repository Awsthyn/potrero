import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import style from './VoluntarioForm.module.css';
import {postVoluntary, addSchedule} from '../../redux/actions/voluntary.js';
import {connect} from 'react-redux';
import CheckBox from './CheckBox';
import swal from 'sweetalert';

class VolunteerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {},
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
	}
	handleOnChange(e) {
		this.setState({
			info: {...this.state.info, [e.target.name]: e.target.value},
		});
	}
	handleOnClick(e) {
		e.preventDefault();
		swal({
			title: "¿Estas seguro?",
			text: "Antes de enviar tu solicitud verifica que tus datos sean correctos!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			console.log(this.state.info)
			if (willDelete) {
				console.log(this.state.info)
			  this.props.postVoluntary(this.state.info);
		      //this.props.addSchedule();
			  swal("Tu solicitud ha sido enviada!", {
				icon: "success",
			  });
			} else {
			  swal("Solicitud no enviada");
			}
		  });
	}

	render() {
		var control;
		let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
		return (
			<div className={style.Formm} style={{justifyContent: 'center', display: 'flex'}}>
				<form method = "post">
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
						<small>Telefono</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="phone"
							//label="Telefono"
							type="number"
							id="standard-basic5"
							onChange={e => this.handleOnChange(e)}
						/>
						<small>Linkedin</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="linkedin"
							label="ej: www.linkedin.com/tu_cuenta/"
							type="text"
							id="standard-basic6"
							onChange={e => this.handleOnChange(e)}
						/>
						<small>CV</small>
						<TextField
							style={{width: '80%', marginTop: '1%', display: 'block'}}
							name="cv"
							//label="CV"
							type="file"
							id="standard-basic7"
							onChange={e => this.handleOnChange(e)}
						/>
						<br></br>
						<small> El horario establecido para las clases es de 8:00 hs a 18:00 hs.</small>
						<br></br>
						<small>
							Escoge tu disponibilidad horaria (el rango horario no debe ser inferior a 1 hora)
						</small>
						{dias.map((dia, idx) => (
							<CheckBox dia={dia} key={idx} />
						))}
					</div>
					{!this.state.info.firstName ||
					!this.state.info.lastName ||
					!this.state.info.birthday ||
					!this.state.info.email ||
					!this.state.info.phone ||
					(!this.state.info.linkedin && !this.state.info.cv)
						? (control = true)
						: false}
					<Button
						disabled={control ? true : false}
						variant="contained"
						className={style.skere}
						type="submit"
						value="Submit"
						onClick={(e) => this.handleOnClick(e)}>
						Enviar
					</Button>
				</form>
			</div>
		);
	}
}

export default connect(null, {postVoluntary, addSchedule})(VolunteerForm);
