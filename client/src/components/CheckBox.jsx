import React from 'react';
import Horarios from './Horarios';

export default class CheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			[this.props.dia]: [{de: 12, hasta: 14}],
			checked: false,
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
		this.setState(function (state) {
			var newState = state[this.props.dia].map((h, i) => {
				if (i === idx) {
					if (type === 'aumentar' && clase === 'de' && h.de >= 8 && h.de < 17) {
						if (h.hasta - 1.5 < h.de) h.hasta = h.de + 1.5;
						return (h.de = h.de + 0.5);
					} else if (type === 'aumentar' && clase === 'hasta' && h.hasta < 18 && h.hasta >= 9) {
						return (h[clase] = h[clase] + 0.5);
					} else if (type === 'disminuir' && clase === 'de' && h.de <= 17 && h.de > 8) {
						return (h[clase] = h[clase] - 0.5);
					} else if (
						type === 'disminuir' &&
						clase === 'hasta' &&
						h.hasta <= 18 &&
						h.hasta > 9 &&
						h.hasta >= h.de + 1.5
					) {
						return (h[clase] = h[clase] - 0.5);
					}
				} else {
					return h;
				}
			});
			return {
				newState,
			};
		});
	}
	render() {
		let dia = this.state[this.props.dia];
		let checked = this.state.checked;
		console.log(this.props);
		console.log(dia);
		return (
			<div>
				<input
					type="checkbox"
					name="moday"
					value="lunes"
					onClick={e => this.setState({checked: e.target.checked})}
				/>
				<label htmlFor="lunes">{this.props.dia} </label>
				{checked ? (
					<div>
						{' '}
						{dia.map((h, i) => {
							return (
								<Horarios de={h.de} hasta={h.hasta} key={i} handleTime={this.handleTime} id={i} />
							);
						})}
						<button onClick={e => this.handleOnClick(e)}> + </button>
					</div>
				) : null}
				<br></br>
			</div>
		);
	}
}
