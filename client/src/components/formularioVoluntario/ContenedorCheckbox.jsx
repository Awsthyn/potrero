import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Acordeon from './Acordeon';
import IconButton from '@material-ui/core/IconButton';
import style from './VoluntarioForm.module.css';

export default function ContenedorCheckbox({history, active}) {
	const [redirect, setRedirect] = useState(false);
	const [expandedAll, setExpandedAll] = useState(false);

	if (redirect) {
		return <Redirect to="/voluntarios/niveles" />;
	}
	let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
	
	const handleChange = (panel) => (event, isExpanded) => {
      setExpandedAll(isExpanded ? panel : false) 
  };
	
	return (
		<div>
			<IconButton aria-label="ir atrás" onClick={() => history.push('/voluntarios/formulario')}>
				<span className="material-icons">arrow_back</span>
			</IconButton>
			<div className={style.circles}>
				<div className={style.circleGray}>1</div><div className={style.lineGray}></div> <div className={style.circleLila}>2</div><div className={style.lineGray}></div><div className={style.circleGray}>3</div><div className={style.lineGray}></div><div className={style.circleGray}>4</div>
			</div>
			<div className={`${style.checkboxMaterias} ${style.formInput}`}>
			<ul className={style.containerListDays}>
			{ dias && dias.map((dia, idx) => (
				<li className={style.itemList}><Acordeon className={style.inlineCheck} dia={dia} key={idx} 
				handleChange={handleChange} expandedAll={expandedAll}
				/></li>
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
				}}>
				Continuar
				<span className="material-icons">trending_flat</span>
			</Button>
				</div>
		</div>
	);
}
