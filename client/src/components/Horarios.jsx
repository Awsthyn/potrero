import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';

export default function Horarios({de, hasta, id, handleTime}) {
	console.log(de);
	const [horaDe, setHoraDe] = useState();
	const [horaHasta, setHoraHasta] = useState();

	const renderTimeDe = () => {
		if (de < 10 && de.toString().length === 1) {
			setHoraDe('0' + de + ':00');
		} else if (de < 10 && de.toString().length > 1) {
			setHoraDe('0' + de + ':30');
		} else if (de >= 10 && de.toString().length === 2) {
			setHoraDe(de + ':00');
		} else if (de >= 10 && de.toString().length > 2) {
			setHoraDe(de + ':30');
		}
	};
	const renderTimeHasta = () => {
		if (hasta < 10 && hasta.toString().length === 1) {
			setHoraHasta('0' + hasta + ':00');
		} else if (hasta < 10 && hasta.toString().length > 1) {
			setHoraHasta('0' + hasta + ':30');
		} else if (hasta >= 10 && hasta.toString().length === 2) {
			setHoraHasta(hasta + ':00');
		} else if (hasta >= 10 && hasta.toString().length > 2) {
			setHoraHasta(hasta + ':30');
		}
	};

	useEffect(() => {
		renderTimeDe();
		renderTimeHasta();
	}, []);

	return (
		<div>
			{/* <label htmlFor="hora">Hora</label> */}
			<IconButton aria-label="delete" onClick={() => handleTime('aumentarDe', id)}>
				<span className="material-icons">expand_less</span>
			</IconButton>
			<IconButton aria-label="delete">
				<span className="material-icons">expand_more</span>
			</IconButton>
			<span> de: {horaDe} </span>
			<span> a {horaHasta}</span>
			<IconButton aria-label="delete">
				<span className="material-icons">expand_less</span>
			</IconButton>
			<IconButton aria-label="delete">
				<span className="material-icons">expand_more</span>
			</IconButton>
			{/* <button>Hora</button>
         <button>Minutos</button> */}
		</div>
	);
}
