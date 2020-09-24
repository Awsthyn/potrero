import React, { useState } from 'react';
import Acordeon from './Acordeon';
import style from './StudentForm.module.css'

export default function ContenedorCheckbox({ uploadParentState }) {
	const [expandedAll, setExpandedAll] = useState(false);
	const [schedule, setSchedule] = useState([])

	let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

	const handleChange = (panel) => (event, isExpanded) => {
		setExpandedAll(isExpanded ? panel : false)
	};
	const setTime = (horarios, ultimo) => {
		let newSchedule;
	newSchedule = schedule.filter(s => s.nameWeekDay !== horarios[0].nameWeekDay)
	if(ultimo){
		setSchedule(newSchedule)
	}else{
		setSchedule(newSchedule.concat(horarios))
	}
		uploadParentState(schedule);
	}

	return (
		<div>
			<small> Los horarios límites para las clases son de 8:00 hs a 20:00 hs. Escoge tu rango horario (los mismos no deben ser inferiores a 1 hora)</small>
			<div className={`${style.checkboxMaterias}${style.formInput}`}>
				<ul style={{marginTop: '20px'}} className={style.containerListDays}>
					{dias && dias.map((dia, idx) => (
						<li className={style.itemList} key={idx}>
							<Acordeon className={style.inlineCheck} dia={dia} key={idx} setTime={setTime}
								handleChange={handleChange} expandedAll={expandedAll} render={schedule.filter(s => s.nameWeekDay === dia)} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}