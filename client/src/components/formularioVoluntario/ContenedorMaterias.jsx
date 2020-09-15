import React from 'react';
import {postVoluntary} from '../../redux/actions/voluntary.js';
import {connect} from 'react-redux';
import Materias from './Materias';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import style from './VoluntarioForm.module.css';
import style1 from './Materias.module.css';

class ContenedorMaterias extends React.Component {
	constructor(props) {
		super();
		this.state = {
			materia: [],
			info: {},
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
	}
	handleOnClick(id, e) {
		if (e.target.style.backgroundColor === 'rgb(140, 198, 62)') {
			e.target.style.backgroundColor = 'white';
			this.setState(function (state) {
				return {materia: state.materia.filter(m => m !== id)};
			});
		} else {
			e.target.style.backgroundColor = 'rgb(140, 198, 62)';
			this.setState({
				materia: [...this.state.materia, id],
			});
		}
	}
	handleOnChange(e) {
		this.setState({
			info: {...this.state.info, [e.target.name]: e.target.value},
		});
	}
	handleSend() {
		let data = JSON.parse(localStorage.getItem('datos'));
		let allData = Object.assign(this.state.info, data);
		var materiasConcatenadas = {materias: ""};
		this.state.materia.map((m,i) => {
			if(i !== this.state.materia.length - 1) {
                return materiasConcatenadas.materias = materiasConcatenadas.materias + m + "-";
			} else {
                return materiasConcatenadas.materias = materiasConcatenadas.materias + m;
			}
		})
		
		this.props.postVoluntary(allData, materiasConcatenadas);
	}
	render() {
		var control;
		var materias = ['Matemática', 'Idiomas', 'Biología', 'Tecnología', 'Artes', 'Computación'];
		return (
			<div>
				<h4>¿En qué áreas podrías ayudar?</h4>
				<div className={style1.contenedorMateria}>{ materias.map((m,i) => <Materias materia={m} key={i} handleOnClick={this.handleOnClick}/>) }</div>
				<br></br>
				<small>Linkedin</small>
				<TextField
					style={{width: '80%', marginTop: '1%', display: 'block'}}
					name="linkedin"
					//label="ej: www.linkedin.com/tu_cuenta/"
					type="text"
					id="standard-basic6"
					onChange={e => this.handleOnChange(e)}
				/>
				<br></br>
				<small>CV</small>
				<TextField
					style={{width: '80%', marginTop: '1%', display: 'block'}}
					name="cv"
					//label="CV"
					type="file"
					id="standard-basic7"
					onChange={e => this.handleOnChange(e)}
				/>
				{!this.state.info.linkedin && !this.state.info.cv ? (control = true) : false}
				<Button
					disabled={control ? true : false}
					variant="contained"
					className={style1.botonEnviar}
					type="submit"
					value="Submit"
					onClick={e => this.handleSend(e)}>
					Enviar
				</Button>
			</div>
		);
	}
}

export default connect(null, {postVoluntary})(ContenedorMaterias);
