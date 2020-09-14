import React from 'react';
import {postVoluntary, addSchedule} from '../../redux/actions/voluntary.js';
import {connect} from 'react-redux';
import Materias from './Materias';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import style from './VoluntarioForm.module.css';

class ContenedorMaterias extends React.Component {
	constructor(props) {
		super();
		this.state = {
			mat: [],
			info: {},
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
	}
	handleOnClick(id, e) {
		if (e.target.style.backgroundColor === 'rgb(167, 255, 167)') {
			e.target.style.backgroundColor = 'white';
			this.setState(function (state) {
				return {mat: state.mat.filter(m => m !== id)};
			});
		} else {
			e.target.style.backgroundColor = 'rgb(167, 255, 167)';
			this.setState({
				mat: [...this.state.mat, id],
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
		console.log(allData);
		this.props.postVoluntary(allData);
	}
	render() {
		var control;
		var materias = ['Matemática', 'Idiomas', 'Biología', 'Tecnología', 'Artes', 'Computación'];
		return (
			<div>
				<h4>¿En qué áreas podrías ayudar?</h4>
				{materias.map((m, i) => (
					<Materias materia={m} key={i} handleOnClick={this.handleOnClick} />
				))}
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
					//className={style.skere}
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
