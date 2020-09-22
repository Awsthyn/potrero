import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import VolunteerForm from './VoluntarioForm';
import ContenedorMaterias from './ContenedorMaterias';
import ContenedorCheckbox from './ContenedorCheckbox';
import Niveles from './Niveles';
import Confirmacion from './Confirmacion';
import style from './VoluntarioForm.module.css';
import img from '../VolunteerFormAssets/formJueguitos.jpg';
import logo from '../VolunteerFormAssets/logorecortado.png';
import CargarArchivos from './CargarArchivos';


const circleColor = (id) => {
	document.getElementById(id).className = style.circleLila
	let ids = ['uno', 'dos', 'tres', 'cuatro', 'cinco']
	ids.map(ids => {
		if(ids !== id){
			return document.getElementById(ids).className = style.circleGray
		}
	})
}

export default function ContenedorForm({history, location}) {
	const goBack = () => {
		switch(location.pathname ){
			case "/voluntarios/formulario":
				history.push('/')
			case "/voluntarios/horarios":
				history.push('/voluntarios/formulario')
				break;
			case "/voluntarios/niveles":
				history.push('/voluntarios/horarios')
				break;
			case "/voluntarios/materias":
				history.push('/voluntarios/niveles')
				break;
			case "/voluntarios/cargararchivos":
				history.push('/voluntarios/materias')
				break;
			default: 
			break;
		}
	}
	const goTo = (e) => {
		console.log(e.target.id)
		switch(e.target.id){
			case 'uno': 
				history.push('/voluntarios/formulario')
				break;
			case 'dos':
				history.push('/voluntarios/horarios')
				break;
			case 'tres':
				history.push('/voluntarios/niveles')
				break;
			case 'cuatro':
				history.push('/voluntarios/materias')
				break;
			case 'cinco':
				history.push('/voluntarios/cargararchivos')
				break;
			default:
				return 
		}
	}
	useEffect(() => {	
			if( location.pathname === "/voluntarios/formulario") circleColor('uno')
			if( location.pathname === "/voluntarios/horarios") circleColor('dos')
			if( location.pathname === "/voluntarios/niveles") circleColor('tres')
			if( location.pathname === "/voluntarios/materias") circleColor('cuatro')
			if( location.pathname === "/voluntarios/cargararchivos") circleColor('cinco')				
	}, [location])
	return (
		<div className={style.Contenedor}>
			<div className={style.conteiner}>
				<img
					className={style.img}
					src={img}
					alt="Jugador de fútbol"
					/>
					<div className={style.imgTxt}><b>Sumáte!</b></div>
						<div className={style.imgContainText}>
							Trabajemos juntos por la inclusión social y el 
							desarrollo humano de niños y adolescentes en estado de vulnerabilidad
						</div>
					</div>
			<div className={style.formLogo} >
				{location.pathname !== '/voluntarios/confirmacion' ?
				<span> 
						<div> 
							<svg viewBox="0 0 16 16" className={style.leftArrow} onClick={()=> goBack()} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
							</svg> 
						</div>
						<img
							id="comp-jgasx8rqimgimage"
							style={location.pathname === '/voluntarios/formulario' ? {top: '50px', marginBottom: '70px'} :null}
							className={style.imgSize}
							alt="Fundacion El Potrero"
							data-type="image"
							itemProp="image"
							src={logo}
						/>
						<div className={style.circles}>
							<div id='uno' className={style.circleGray} onClick={(e) => goTo(e)} >1</div>
							<div className={style.lineGray}></div> 
							<div id='dos' className={style.circleGray} onClick={(e) => goTo(e)}>2</div>
							<div className={style.lineGray}></div>
							<div id='tres' className={style.circleGray} onClick={(e) => goTo(e)}>3</div>
							<div className={style.lineGray}></div>
							<div id='cuatro' className={style.circleGray} onClick={(e) => goTo(e)}>4</div>
							<div className={style.lineGray}></div>
							<div id='cinco' className={style.circleGray} onClick={(e) => goTo(e)}>5</div>						
						</div>
				</span> :null }
						<Route exact path="/voluntarios/formulario" component={VolunteerForm} />
						<Route exact path="/voluntarios/horarios" component={ContenedorCheckbox} />
						<Route exact path="/voluntarios/niveles" component={Niveles} />
						<Route exact path="/voluntarios/materias" component={ContenedorMaterias} />
						<Route exact path="/voluntarios/cargararchivos" component={CargarArchivos} />
						<Route exact path="/voluntarios/confirmacion" component={Confirmacion} />
			</div>
		</div>
	);
}
