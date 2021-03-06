import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Acordeon from './Acordeon';
import style from './VoluntarioForm.module.css';

export default function ContenedorCheckbox({history}) {
	const [redirect, setRedirect] = useState(false);
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
}

useEffect(() => {
	if(!schedule.length){
		let newState = JSON.parse(localStorage.getItem('schedule'))
			if(newState) setSchedule(newState)
		}
}, [])
if (redirect) {
	return <Redirect to="/voluntarios/niveles" />;
}
var control;
	return (
		<div>
			<div className={style.formInput} id={style.scroll} >
			<p style={{margin: '25px 0px', fontSize: '13px'}} > Los horarios límites para las clases son de 8:00 hs a 20:00 hs. Los rangos horarios no deben ser inferiores a 1 hora</p> 
				<ul style={{marginTop: '10px'}} className={style.containerListDays}>
					{ dias.map((dia, idx) => (
						<li className={style.itemList} key={idx}>
							<Acordeon  dia={dia} key={idx} setTime={setTime} handleChange={handleChange} expandedAll={expandedAll} render={schedule.filter(s => s.nameWeekDay === dia)} />
						</li>
						))}
				</ul>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<div onClick={() => history.push('/voluntarios/formulario')} > 
						<svg viewBox="0 0 16 16" className={style.leftArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
						</svg> 
					</div>
					{schedule.length === 0 
						? (control = true)
						: false}
					<Button
						disabled={control ? true : false}
						style={control ? {backgroundColor: "#CAD2D9"} : null}
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
		</div>
	);
}
