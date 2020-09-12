import React from 'react';
import Horarios from './Horarios';

export default class CheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			[this.props.dia]: [{de: 12, hasta: 14}],
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleTime = this.handleTime.bind(this);
	}

	handleOnClick(e) {
		e.preventDefault();
		this.setState({
			[this.props.dia]: [...this.state[this.props.dia], {de: 12, hasta: 14}],
		});
	}
	handleTime(type, idx, clase) {
		// if (type === 'aumentarDe') {
		this.setState(function (state) {
			console.log(type);
			var newState = state[this.props.dia].map((h, i) => {
				console.log(h);
				console.log(h[clase]);
				if (i === idx) {
					if (type === 'aumentar' && clase === 'de' && h[clase] >= 8 && h[clase] < 17) {
						return (h[clase] = h[clase] + 0.5);
					} else if (type === 'aumentar' && clase === 'hasta' && h[clase] < 18 && h[clase] >= 9) {
						return (h[clase] = h[clase] + 0.5);
					} else if (type === 'disminuir' && clase === 'de' && h[clase] <= 17 && h[clase] > 8) {
						return (h[clase] = h[clase] - 0.5);
					} else if (type === 'disminuir' && clase === 'hasta' && h[clase] <= 18 && h[clase] > 9) {
						console.log(h[clase] - 0.5);
						return (h[clase] = h[clase] - 0.5);
					}
				} else {
					return h;
				}
			});
			console.log(newState);
			return {
				newState,
			};
		});
		// }
	}
	render() {
		let dia = this.state[this.props.dia];
		console.log(this.props);
		return (
			<div>
				<input type="checkbox" name="moday" value="lunes" />
				<label htmlFor="lunes">{this.props.dia} </label>
				{dia.map((h, i) => {
					return <Horarios de={h.de} hasta={h.hasta} key={i} handleTime={this.handleTime} id={i} />;
				})}
				<button onClick={e => this.handleOnClick(e)}> + </button>
				<br></br>
			</div>
		);
	}
}
