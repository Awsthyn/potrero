import React from 'react';
import {Route} from 'react-router-dom';
import VolunteerForm from './VoluntarioForm';
import ContenedorMaterias from './ContenedorMaterias';
import ContenedorCheckbox from './ContenedorCheckbox';
import Niveles from './Niveles';
import Confirmacion from './Confirmacion';
import style from './VoluntarioForm.module.css';

export default function ContenedorForm() {
	return (
		<div className={style.Contenedor}>
			<div className={style.conteiner}>
			<img
				className={style.img}
				src="https://image.freepik.com/foto-gratis/accion-jugador-futbol-estadio_1150-14608.jpg"
				alt="Jugador de fútbol"
				/>
				<div className={style.imgTxt}><b>Sumáte!</b></div>
					<div className={style.imgContainText}>
						Trabajemos juntos por la inclusión social y el 
						desarrollo humano de niños y adolescentes en estado de vulnerabilidad
					</div>
				</div>
				
			<div>
				<img
					id="comp-jgasx8rqimgimage"
					className={style.imgSize}
					alt="Fundacion El Potrero"
					data-type="image"
					itemProp="image"
					src="https://static.wixstatic.com/media/a54840_c5097fbb225d46cf8422b922e37634bb~mv2_d_2481_2226_s_2.png/v1/crop/x_578,y_519,w_1325,h_1048/fill/w_133,h_100,al_c,q_85,usm_0.66_1.00_0.01/a54840_c5097fbb225d46cf8422b922e37634bb~mv2_d_2481_2226_s_2.webp"
				/>
				<Route exact path="/voluntarios/formulario" component={VolunteerForm} />
				<Route exact path="/voluntarios/horarios" component={ContenedorCheckbox} />
				<Route exact path="/voluntarios/niveles" component={Niveles} />
				<Route exact path="/voluntarios/materias" component={ContenedorMaterias} />
				<Route exact path="/voluntarios/confirmacion" component={Confirmacion} />
			</div>
		</div>
	);
}
