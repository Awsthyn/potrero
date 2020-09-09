import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class VolunteerForm extends React.Component {
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
    return (
      <div className="Formm" style={{justifyContent:'center', display: 'flex'}}>
			<form>
				<div className="form-group">
					<label htmlFor="exampleInputNombre"></label>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="nombre"
						label="Nombre"
						type="text"
						id="standard-basic1"
						onChange={e => this.handleOnChange(e)}
					/>
					<label htmlFor="exampleInputApellido"></label>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="apellido"
						label="Apellido"
						type="text"
						id="standard-basic2"
						onChange={e => this.handleOnChange(e)}
					/>
          <label htmlFor="exampleInputFechaDeNacimiento"></label>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="fechaDeNacimiento"
						label="Fecha de nacimiento"
						type="date"
						id="standard-basic3"
						onChange={e => this.handleOnChange(e)}
					/>
					<label htmlFor="exampleInputEmail"></label>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="email"
						label="E-mail"
						type="email"
						id="standard-basic4"
						aria-describedby="emailHelp"
						onChange={e => this.handleOnChange(e)}
					/>
					<label htmlFor="exampleInputTelefono"></label>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="telefono"
						label="Telefono"
						type="number"
						id="standard-basic5"
						onChange={e => this.handleOnChange(e)}
					/>
					<label htmlFor="exampleInputLinkedin"></label>
					<TextField
					  style={{width:'60%', marginTop: '1%', display: 'block'}}
						name="linkedin"
						label="Linkedin"
						type="url"
						id="standard-basic6"
						onChange={e => this.handleOnChange(e)}
					/>
				</div>
			</form>
		</div>
    )
  }
}
