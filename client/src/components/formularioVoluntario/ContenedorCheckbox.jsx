import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Checkbox from './CheckBox';

export default function ContenedorCheckbox() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/voluntarios/materias" />;
	}
	let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
	return (
		<div>
			{dias.map((dia, idx) => (
				<Checkbox dia={dia} key={idx} />
			))}
			<button
				variant="contained"
				className=""
				type="submit"
				value="Submit"
				onClick={() => {
					setRedirect(true);
				}}>
				Continuar
			</button>
		</div>
	);
}
