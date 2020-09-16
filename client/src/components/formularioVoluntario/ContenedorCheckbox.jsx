import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Checkbox from './CheckBox';
import IconButton from '@material-ui/core/IconButton';
import style from './VoluntarioForm.module.css';

export default function ContenedorCheckbox({history}) {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/voluntarios/materias" />;
	}
	let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
	
	return (
		<div>
			<div className={style.circles}>
			  <div className={style.circleLila}>1</div><div className={style.lineGray}></div> <div className={style.circleGray}>2</div><div className={style.lineGray}></div><div className={style.circleGray}>3</div>
			</div>
			<div className={`${style.checkboxMaterias}`}>
			<IconButton aria-label="ir atrás" onClick={() => history.push('/voluntarios/formulario')}>
				<span className="material-icons">arrow_back</span>
			</IconButton>
			{dias.map((dia, idx) => (
				<Checkbox dia={dia} key={idx} />
				))}
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
