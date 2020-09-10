import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './volunteerForm.css';
import {postVoluntary} from '../../redux/actions/voluntary';
import {connect} from 'react-redux';

class VolunteerForm extends React.Component {
  constructor({postVoluntary}) {
    super();
      this.state = {}
      this.handleOnChange = this.handleOnChange.bind(this);
  }
   handleOnChange(e) {
     this.setState({
       [e.target.name] : e.target.value
     })
   }
   handleOnClick(){
       postVoluntary(this.state)
   }

  render() {
    var control;
    return (
      <div className="Formm" style={{justifyContent:'center', display: 'flex'}}>
			<form>
				<div className="form-group">
        <small>Nombre</small>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="nombre"
						//label="Nombre"
						type="text"
						id="standard-basic1"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Apellido</small>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="apellido"
						//label="Apellido"
						type="text"
						id="standard-basic2"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Fecha de nacimiento</small>
					<TextField
					  style={{width:'80%', marginTop: '1%', display: 'block'}}
						name="fechaDeNacimiento"
						//label="Fecha de nacimiento"
            placeholder="fecha de nacimiento"
						type="date"
						id="standard-basic3"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>E-mail</small>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="email"
						//label="E-mail"
						type="email"
						id="standard-basic4"
						aria-describedby="emailHelp"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Telefono</small>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="telefono"
						//label="Telefono"
						type="number"
						id="standard-basic5"
						onChange={e => this.handleOnChange(e)}
					/>
          <small>Linkedin</small>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="linkedin"
						//label="Linkedin"
						type="url"
						id="standard-basic6"
						onChange={e => this.handleOnChange(e)}
					/>
				</div>
        {
          !this.state.nombre ||
					!this.state.apellido ||
					!this.state.fechaDeNacimiento ||
					!this.state.email ||
					!this.state.telefono ||
					!this.state.linkedin
					? (control = true)
					: false
        }
					<Button  disabled={control ? true : false}
					 variant="contained"
					 className='skere'
					 type='submit'
					 value="Submit"
					 onClick={() => this.handleOnClick()}>
						Submit
					</Button>
			</form>
		</div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		voluntary: state.voluntary,
	};
}

export default connect(mapStateToProps, {postVoluntary})(VolunteerForm);
