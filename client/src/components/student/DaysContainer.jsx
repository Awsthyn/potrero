import React, {useState} from 'react';
import Acordeon from './Acordeon';
import style from './StudentForm.module.css'

export default function ContenedorCheckbox({history, uploadParentState}) {
	const [expandedAll, setExpandedAll] = useState(false);
	const [schedule, setSchedule] = useState([])

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
	uploadParentState(schedule)

}

	return (
		<div>

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
				</div>
		</div>
	);
}
