import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import style from './VoluntarioForm.module.css';
import {postVoluntary} from '../redux/actions/voluntary.js';
import {connect} from 'react-redux';


class VolunteerForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {}
      this.handleOnChange = this.handleOnChange.bind(this);
  }
   handleOnChange(e) {
     this.setState({
       [e.target.name] : e.target.value
     })
   }
  render() {
    var control;
    return (
      <div className={style.Formm} style={{justifyContent:'center', display: 'flex'}}>
			<form>
				<div className="form-group">
        <small>Nombre</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="firstName"
						//label="Nombre"
						type="text"
						id="standard-basic1"
						onChange={e => this.handleOnChange(e)}

					/>
          <small>Apellido</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="lastName"
						//label="Apellido"
						type="text"
						id="standard-basic2"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Fecha de nacimiento</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="birthday"
						//label="Fecha de nacimiento"
            placeholder="fecha de nacimiento"
						type="date"
						id="standard-basic3"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>E-mail</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="email"
						//label="E-mail"
						type="email"
						id="standard-basic4"
						aria-describedby="emailHelp"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Telefono</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="phone"
						//label="Telefono"
						type="number"
						id="standard-basic5"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Linkedin</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="linkedin"
						//label="Linkedin"
						type="url"
						id="standard-basic6"
						onChange={e => this.handleOnChange(e)}
					/>
				</div>
        {
          !this.state.firstName ||
					!this.state.lastName ||
					!this.state.birthday ||
					!this.state.email ||
					!this.state.phone ||
					!this.state.linkedin
					? (control = true)
					: false
        }
					<Button  disabled={control ? true : false}
					 variant="contained"
					 className={style.skere}
					 type='submit'
					 value="Submit"
					 onClick={(e) => { e.preventDefault(); this.props.postVoluntary(this.state);}}>
						Enviar
					</Button>
			</form>
		</div>
    )
  }
}

export default connect(null, {postVoluntary})(VolunteerForm);
