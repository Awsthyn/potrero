import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Acordeon from './Acordeon';
import IconButton from '@material-ui/core/IconButton';
import style from './VoluntarioForm.module.css';
// import styles from './ContenedorCheckbox.module.css';

export default function ContenedorCheckbox({history, active}) {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/voluntarios/materias" />;
	}
	let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

	
	return (
		<div>
			<div className={style.circles}>
				<div className={style.circleGray}>1</div><div className={style.lineGray}></div> <div className={style.circleLila}>2</div><div className={style.lineGray}></div><div className={style.circleGray}>3</div>
			</div>
			<div className={`${style.checkboxMaterias}`}>
			<IconButton aria-label="ir atrás" onClick={() => history.push('/voluntarios/formulario')}>
				<span className="material-icons">arrow_back</span>
			</IconButton>
			<ul className={style.containerListDays}>
			{ dias && dias.map((dia, idx) => (
				<li className={style.itemList}><Acordeon className={style.inlineCheck} dia={dia} key={idx} /></li>
				))}
				</ul>
			<Button
				variant="contained"
				style={{marginTop: '3rem'}}
				className={style.skere}
				type="submit"
				value="Submit"
				onClick={() => {
					setRedirect(true);
				}}>
				Continuar
				<span className="material-icons">trending_flat</span>
			</Button>
				</div>
		</div>
	);
}

function mapStateToProps(state){
	return {
		active: state.active
	}
}