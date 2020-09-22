import React from 'react';
import { withRouter } from "react-router-dom";
import { getCurrentUser, changePassword, sessionLogin} from "../../redux/actions/session"
import { connect } from "react-redux";
import swal from 'sweetalert';


class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            password: "",
            repeatPassword: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const url = window.location.href
        const ubication = url.lastIndexOf('/')
        const token = url.slice(ubication + 1)
        this.props.getCurrentUser(token)
    }

    error = () => {
        swal({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "warning",
            dangerMode: true,
            timer: "4000"
        })
    }

    complete() {
        swal({
            title: "Completado",
            text: "El cambio de perfil ha sido exitoso",
            icon: "success",
            timer: "4000",
        })
        setTimeout(() => this.props.history.push('/usuario/login'), 3000)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.repeatPassword) {
            const url = window.location.href
            const ubication = url.lastIndexOf('/')
            const token = url.slice(ubication + 1)

            this.props.changePassword(token, this.state)
            this.complete()
        } else {
            this.error()
        }
    }
    render() {
        return (

        <div className="d-flex border border-secondary m-auto m-0 shadow p-3 mb-5 bg-white rounded m-50 d-flex flex-column align-items-center" >
            <form onSubmit={this.handleSubmit} className="form-group ">
                <div className="form-group">
                    <label className="lead">Nueva contraseña:</label>
                    <input type="password" id="password" name="password" onChange={this.handleChange} className="form-control" value={this.state.password} placeholder={'Nueva contraseña'}/>
                </div>
                <div className="form-group">
                    <label className="lead">Confirmar contraseña:</label>
                    <input type="password" id="repeatPassword" name="repeatPassword" onChange={this.handleChange} className="form-control" value={this.state.repeatPassword} placeholder={'Confirmar contraseña'}/>
                </div>

            <button type="submit" className="btn btn-dark lead" >Enviar</button>
            </form>
        </div>
        )};

}


function mapDispatchToProps(dispatch) {
    return {
        getCurrentUser: (token) => dispatch(getCurrentUser(token)),
        changePassword: (token, password) => dispatch(changePassword(token, password))
    };
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ResetPassword));
