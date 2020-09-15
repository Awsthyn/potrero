import React from 'react';
import {postVoluntary} from '../../redux/actions/voluntary.js';
import {connect} from 'react-redux';
import Materias from './Materias';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ContenedorMaterias extends React.Component {
	constructor(props) {
		super();
		this.state = {
			mat: [],
			info: new FormData(),
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleOnFileChange = this.handleOnFileChange.bind(this);
		this.fileInput = React.createRef();
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
		const field = e.target;

		this.state.info.append(field.name, field.value);

		this.setState({...this.state, info: this.state.info});
	}

	handleOnFileChange = (e) => {
		const field = e.target;

		this.state.info.append(field.name, field.files[0]);

		this.setState({ ...this.state, info: this.state.info});
	}
	handleSend() {
		let data = JSON.parse(localStorage.getItem('datos'));

		Object.entries(data).forEach(dato => {
			this.state.info.append(dato[0], dato[1])
		});

		this.props.postVoluntary(this.state.info);
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
				<TextField
					style={{width: '80%', marginTop: '1%', display: 'block'}}
					name="cv"
					//label="CV"
					type="file"
					accept=".pdf"
					id="standard-basic7"
					onChange={e => this.handleOnFileChange(e)}
				/>
				<br></br>
				<small>CV</small>
				<small>Linkedin</small>
				<TextField
					style={{width: '80%', marginTop: '1%', display: 'block'}}
					name="linkedin"
					//label="ej: www.linkedin.com/tu_cuenta/"
					type="text"
					id="standard-basic6"
					onChange={e => this.handleOnChange(e)}
				/>
				{/* {!this.state.info.linkedin && !this.state.info.cv ? (control = true) : false} */}
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
