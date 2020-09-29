import React from 'react';
import { connect } from "react-redux";
import swal from 'sweetalert';
import { mailAdvisor } from '../../redux/actions/voluntary';

class AdvisorFormMail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            body:""
        }
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
       e.preventDefault();
       const email = this.state.email;
       const body = this.state.body;
      this.props.mailAdvisor(email, body)
      .then(() => {
          swal('Se envió el mail correctamente')
      }).catch(err =>{
          swal('No se pudo enviar el mail. Vuelva a intentarlo')
      })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="texto de ayuda" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">Ingrese el email del Asesor.</small>
              </div>
              <div className="form-group">
                 <label for="exampleFormControlTextarea1">Mensaje</label>
                 <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                 <small id="emailHelp" className="form-text text-muted">Ingrese el contenido del email.</small>
              </div>
              <button type="button" className="primary">Enviar</button>
        </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    mailAdvisor: (email,body) => dispatch(mailAdvisor(email,body)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AdvisorFormMail);
