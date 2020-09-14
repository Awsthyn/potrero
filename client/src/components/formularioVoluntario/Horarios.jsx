import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';

export default function Horarios({de, hasta, id, handleTime, handleDelete}) {
	console.log(de);
	const [horaDe, setHoraDe] = useState();
	const [horaHasta, setHoraHasta] = useState();

	const renderTimeDe = () => {
		if (de < 10 && de.toString().length === 1) {
			setHoraDe('0' + de + ':00');
		} else if (de < 10 && de.toString().length > 1) {
			setHoraDe('0' + (de - 0.5) + ':30');
		} else if (de >= 10 && de.toString().length === 2) {
			setHoraDe(de + ':00');
		} else if (de >= 10 && de.toString().length > 2) {
			setHoraDe(de - 0.5 + ':30');
		}
	};
	const renderTimeHasta = () => {
		if (hasta < 10 && hasta.toString().length === 1) {
			setHoraHasta('0' + hasta + ':00');
		} else if (hasta < 10 && hasta.toString().length > 1) {
			setHoraHasta('0' + (hasta - 0.5) + ':30');
		} else if (hasta >= 10 && hasta.toString().length === 2) {
			setHoraHasta(hasta + ':00');
		} else if (hasta >= 10 && hasta.toString().length > 2) {
			setHoraHasta(hasta - 0.5 + ':30');
		}
	};

	useEffect(() => {
		renderTimeDe();
		renderTimeHasta();
	}, [de, hasta, renderTimeDe, renderTimeHasta]);

	return (
		<div>
			<IconButton aria-label="aumentar" onClick={() => handleTime('aumentar', id, 'de')}>
				<span className="material-icons">expand_less</span>
			</IconButton>
			<IconButton aria-label="disminuir" onClick={() => handleTime('disminuir', id, 'de')}>
				<span className="material-icons">expand_more</span>
			</IconButton>
			<span> de: {horaDe} hs</span>
			<span> a {horaHasta} hs</span>
			<IconButton aria-label="aumentar" onClick={() => handleTime('aumentar', id, 'hasta')}>
				<span className="material-icons">expand_less</span>
			</IconButton>
			<IconButton aria-label="disminuir" onClick={() => handleTime('disminuir', id, 'hasta')}>
				<span className="material-icons">expand_more</span>
			</IconButton>
			<IconButton aria-label="delete" onClick={() => handleDelete(id)}>
				<span className="material-icons">delete</span>
			</IconButton>
		</div>
	);
}
