import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Acordeon from './Acordeon';
import style from './VoluntarioForm.module.css';

export default function ContenedorCheckbox() {
	const [redirect, setRedirect] = useState(false);
	const [expandedAll, setExpandedAll] = useState(false);
	const [schedule, setSchedule] = useState([])

	if (redirect) {
		return <Redirect to="/voluntarios/niveles" />;
	}
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
}

	return (
		<div>
			<span className={style.frase}>  
				<p style={{fontSize:'1.3rem', margin: '0px', marginRight: '24%', fontFamily: 'Poppins'}} ><strong>Tu Disponibilidad </strong></p>
				<span style={{fontWeight: 100, color: 'gray', fontSize: '15px',fontFamily: 'Poppins'}} > ¿Cuales son los días y horarios que podrías colaborar con nosotros? </span>
				</span>
			<div className={style.formInput} id={style.scroll} >
			<p style={{margin: '25px 0px', fontSize: '13px'}} > Los horarios límites para las clases son de 8:00 hs a 20:00 hs. Los rangos horarios no deben ser inferiores a 1 hora</p> 
				<ul style={{marginTop: '10px'}} className={style.containerListDays}>
					{ dias && dias.map((dia, idx) => (
						<li className={style.itemList} key={idx}>
							<Acordeon  dia={dia} key={idx} setTime={setTime}
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
				<span style={{margin: '10px'}} className="material-icons">arrow_forward</span>
			</Button>
				</div>
		</div>
	);
}
