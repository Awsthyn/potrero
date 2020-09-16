import React from 'react';
import {postVoluntary} from '../../redux/actions/voluntary.js';
import {getSubjects} from '../../redux/actions/subject.js';
import {connect} from 'react-redux';
import Materias from './Materias';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import style1 from './Materias.module.css';
import swal from 'sweetalert'

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
		this.goBack = this.goBack.bind(this);
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
	handleSend(e) {
		e.preventDefault();
			swal({
				title: "¿Estas seguro?",
				text: "Antes de enviar tu solicitud verifica que tus datos sean correctos!",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willSend) => {
				if (willSend) {
					let data = JSON.parse(localStorage.getItem('datos'));
					let allData = Object.assign(this.state.info, data);
					this.props.postVoluntary(allData, {materias: this.state.materia});
					localStorage.removeItem('datos')
			      //this.props.addSchedule();
				swal("Tu solicitud ha sido enviada!", {
					icon: "success",
				});
				} else {
				swal("Solicitud no enviada");
				}
			});
		
	}
	goBack(){
		this.props.history.push('/voluntarios/horarios');
	}
	componentDidMount(){
	this.props.getSubjects()
	}
	render() {
		var control;
		var materias = this.props.subjects.subjects
		//['Matemática', 'Idiomas', 'Biología', 'Tecnología', 'Artes', 'Computación'];
		return (
			<div>
				<IconButton aria-label="ir atrás" onClick={this.goBack}>
				<span className="material-icons">arrow_back</span>
			</IconButton>
				<h4>¿En qué áreas podrías ayudar?</h4>
				<div className={style1.contenedorMateria}>{ materias?.map((m,i) => <Materias materia={m.name} key={i} handleOnClick={this.handleOnClick}/>) }</div>
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
				{!this.state.info.linkedin && !this.state.info.cv || this.state.materia.length === 0 ? (control = true) : false}
				<Button
					disabled={control ? true : false}
					variant="contained"
					style={{marginTop: '3rem'}}
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
function mapStateToProps(state){
	return {
		subjects: state.subjects
	}
}
export default connect(mapStateToProps, {postVoluntary, getSubjects})(ContenedorMaterias);
