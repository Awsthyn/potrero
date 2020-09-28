import React from 'react';
import { withRouter } from "react-router-dom";
import { getCurrentUser, changePassword, sessionLogin} from "../../redux/actions/session"
import { connect } from "react-redux";
import swal from 'sweetalert';
import style from './PasswordForgot.module.css'
import logo from '../VolunteerFormAssets/logo.png';


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

        <div className = {style.container}>

             <svg onClick={()=> this.props.history.push('/usuario/login')} viewBox="0 0 16 16" class={style.leftArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
              

            <form onSubmit={this.handleSubmit} className={style.formContainer}>
                    <img className={style.logo} src={logo} alt="" />
            
                <div className={style.form}>
                    
                <div>
                <h2 className={`${style.title}`}>Por último...</h2>
                <label className={style.label}>Necesitamos que ingreses una nueva contraseña para restaurar tu cuenta. </label>
                </div>
                <div className = {style.inputContainer}>
                    <input type="password" id="password" name="password" onChange={this.handleChange} className={style.input} value={this.state.password} placeholder={'Nueva contraseña'}/>
                    <input type="password" id="repeatPassword" name="repeatPassword" onChange={this.handleChange} className={style.input} value={this.state.repeatPassword} placeholder={'Confirmar contraseña'}/>
                </div>
                    <button className={style.button} type="submit">Enviar
                                    <svg viewBox="0 0 16 16" className={style.rightArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>
                </div>
               
                    
              

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
