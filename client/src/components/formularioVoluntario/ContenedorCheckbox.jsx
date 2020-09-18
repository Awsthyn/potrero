import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Acordeon from './Acordeon';
import IconButton from '@material-ui/core/IconButton';
import style from './VoluntarioForm.module.css';

export default function ContenedorCheckbox({history}) {
	const [redirect, setRedirect] = useState(false);
	const [expandedAll, setExpandedAll] = useState(false);
	const [schedule, setSchedule] = useState([])

	if (redirect) {
		return <Redirect to="/voluntarios/niveles" />;
	}
	let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
	
	const handleChange = (panel) => (event, isExpanded) => {
		setExpandedAll(isExpanded ? panel : false) 
		// if(schedule){
		// 	event.target.style.backgroundColor === 'rgb(140, 198, 62)'
		// }
};
const setTime = (horarios) => {
	let newSchedule = schedule.filter(s => s.nameWeekDay !== horarios[0].nameWeekDay)
	setSchedule(newSchedule.concat(horarios))
}

	return (
		<div>
			<IconButton aria-label="ir atrás" onClick={() => history.push('/voluntarios/formulario')}>
				<span className="material-icons">arrow_back</span>
			</IconButton>
			<div className={style.circles}>
				<div className={style.circleGray}>1</div><div className={style.lineGray}></div> <div className={style.circleLila}>2</div><div className={style.lineGray}></div><div className={style.circleGray}>3</div><div className={style.lineGray}></div><div className={style.circleGray}>4</div>
			</div>
			<p> Los rangos horarios deben ser colocados en forma ordenada cronológicamente. </p>
			<small> Los horarios límites para las clases son de 8:00 hs a 20:00 hs. Escoge tu rango horario (los mismos no deben ser inferiores a 1 hora)</small> 
			<div className={`${style.checkboxMaterias}${style.formInput}`}>
				<ul className={style.containerListDays}>
					{ dias && dias.map((dia, idx) => (
						<li className={style.itemList} key={idx}>
							<Acordeon className={style.inlineCheck} dia={dia} key={idx} setTime={setTime}
							handleChange={handleChange} expandedAll={expandedAll} />
						</li>
						))}
				</ul>
			<Button
				variant="contained"
				className={style.testButton}
            id={style.skere}
				type="submit"
				value="Submit"
				onClick={() => {
					setRedirect(true);
					localStorage.setItem('schedule', JSON.stringify(schedule))
				}}>
				Continuar
				<span className="material-icons">trending_flat</span>
			</Button>
				</div>
		</div>
	);
}
