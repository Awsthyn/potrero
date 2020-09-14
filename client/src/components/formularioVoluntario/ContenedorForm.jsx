import React from 'react';
import {Route} from 'react-router-dom';
import VolunteerForm from './VoluntarioForm';
import ContenedorMaterias from './ContenedorMaterias';
import ContenedorCheckbox from './ContenedorCheckbox';

export default function ContenedorForm() {
	return (
		<div style={{width: '80%', display: 'flex', justifyContent: 'center'}}>
			<img
				style={{marginRight: '50px'}}
				src="https://image.freepik.com/foto-gratis/accion-jugador-futbol-estadio_1150-14608.jpg"
				alt="Jugador de fútbol"
			/>
			<div>
				<img
					id="comp-jgasx8rqimgimage"
					style={{objectPosition: '50% 50%', width: '106px', height: '80px', objectFit: 'cover'}}
					alt="Fundacion El Potrero"
					data-type="image"
					itemProp="image"
					src="https://static.wixstatic.com/media/a54840_c5097fbb225d46cf8422b922e37634bb~mv2_d_2481_2226_s_2.png/v1/crop/x_578,y_519,w_1325,h_1048/fill/w_133,h_100,al_c,q_85,usm_0.66_1.00_0.01/a54840_c5097fbb225d46cf8422b922e37634bb~mv2_d_2481_2226_s_2.webp"
				/>
				<Route exact path="/voluntarios/formulario" component={VolunteerForm} />
				<Route exact path="/voluntarios/horarios" component={ContenedorCheckbox} />
				<Route exact path="/voluntarios/materias" component={ContenedorMaterias} />
			</div>
		</div>
	);
}
