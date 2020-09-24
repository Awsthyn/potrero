import React from 'react';
import style from './Materias.module.css';

export default class Materias extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div
				style={this.props.fondo[0] ? {height:'40px', margin:'10px', backgroundColor: 'rgb(140, 198, 62)'} :{height:'40px', margin:'10px', backgroundColor: 'white'}}
				id={this.props.materia}
				className={style.botonMateria}
				onClick={e => this.props.handleOnClick(e.target.id, e)}>
				{this.props.materia}
			</div>
		);
	}
}
