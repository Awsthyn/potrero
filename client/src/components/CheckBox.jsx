import React from 'react';
import Horarios from './Horarios';

export default class CheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			[this.props.dia]: [{de: 8, hasta: 17}],
		};
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick(e) {
		e.preventDefault();
		this.setState({
			[this.props.dia]: [...this.state[this.props.dia], {de: 9, hasta: 18}],
		});
	}
	handleTime(type, idx) {
		if (type === 'aumentarDe') {
			this.setState(function () {
				var newState = [this.props.dia].map((h, i) => {
					if (i === idx) {
						return;
					} else {
						return;
					}
				});
			});
		}
	}
	render() {
		let dia = this.state[this.props.dia];
		return (
			<div>
				<input type="checkbox" name="moday" value="lunes" />
				<label htmlFor="lunes">{this.props.dia} </label>
				{dia.map((h, i) => {
					return <Horarios de={h.de} hasta={h.hasta} key={i} handleTime={this.handleTime} id={i} />;
				})}
				<button onClick={e => this.handleOnClick(e)}> + </button>
				<br></br>
				{/* <input type="checkbox" id="martes" name="tuesday" value="martes" />
				<label htmlFor="martes"> Martes </label>
				<br></br>
				<input type="checkbox" id="miercoles" name="wednesday" value="miercoles" />
				<label htmlFor="miercoles"> Miércoles </label>
				<br></br>
				<input type="checkbox" id="jueves" name="thursday" value="jueves" />
				<label htmlFor="jueves"> Jueves </label>
				<br></br>
				<input type="checkbox" id="viernes" name="friday" value="viernes" />
				<label htmlFor="viernes"> Viernes </label>
				<br></br> */}
			</div>
		);
	}
}
