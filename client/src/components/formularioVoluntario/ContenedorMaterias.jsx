import React from 'react';
import {getSubjects} from '../../redux/actions/subject.js';
import {connect} from 'react-redux';
import Materias from './Materias';
import Button from '@material-ui/core/Button'
import style1 from './Materias.module.css';
import styles from './VoluntarioForm.module.css';

class ContenedorMaterias extends React.Component {
	constructor(props) {
		super();
		this.state = {
			materia: [],
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.continuar = this.continuar.bind(this);
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
	
	continuar(){
		this.props.history.push("/voluntarios/cargararchivos")
		localStorage.setItem('materias', JSON.stringify(this.state.materia))
	}

	componentDidMount(){
	this.props.getSubjects()
	}
	render() {
		var control;
		var materias = this.props.subjects.subjects
		return (
			<div className={styles.formInput} >
				<span className={styles.frase} style={{width: '320px', right: '12%'}} >  
				<p style={{fontSize:'1.3rem', margin: '0px', marginRight: '56%'}} ><strong> Por último... </strong></p>
				<span style={{fontWeight: 100, color: 'gray', fontSize: '15px'}} > Estás a un paso de unirte a nuestra causa y nos gustaría saber un poco más de vos </span>
				</span>

				<h4 className={style1.title}>¿En qué áreas podrías asistir?</h4>
				<div className={`${style1.contenedorMateria} ${styles.containerListNiveles}`}>{ materias?.map((m,i) => <Materias materia={m.name} key={i} handleOnClick={this.handleOnClick}/>) }</div>
				
				<Button
						disabled={control ? true : false}
						variant="contained"
						className={styles.testButton}
						id={styles.skere}
						type="submit"
						value="Submit"
						onClick={() => this.continuar()}>
						Continuar
						<span style={{margin:"10px"}} className="material-icons">arrow_forward</span>
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
export default connect(mapStateToProps, {getSubjects})(ContenedorMaterias);
