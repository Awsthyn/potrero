import React from 'react';
import style from './Materias.module.css';

export default class Materias extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div
				style={{height:'40px', margin:'10px'}}
				id={this.props.materia}
				className={style.botonMateria}
				onClick={e => this.props.handleOnClick(e.target.id, e)}>
				{this.props.materia}
			</div>
		);
	}
}
