import React from 'react';
import style from './Login.module.css';

import swal from 'sweetalert';
import { sessionLogin } from "../redux/actions/session.js";
import { connect } from "react-redux";


export class Login extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            loginData: {
                email:"",
                password:""
            },
            errors: {},
        }

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState( prevState => {
            return  {
            ...prevState,
            loginData: {
                ...prevState.loginData,
                [name]: value
            },
            errors: this.validate({
                ...prevState.loginData,
                [name]: value,
            })
        }})
    }

    resetState() {
        this.setState({loginData: {email:'', password:''}, errors: {}})
    }

    handleSubmit(e) {
        e.preventDefault();

        const errores = this.validate(this.state.loginData)
        const hayErrores = Object.entries(errores).length > 0

        if (hayErrores) {
            swal('No se pudo autenticar. Verifique los datos')
        } else {
            this.props.sessionLogin(this.state.loginData)
            .then(() =>{
                swal('Bienvenido')
                this.resetState()
            })
            .catch((err) => {
                swal('No se pudo autenticar. Verifique los datos')
            });
        }
    }

    validate(input) {
       let errors = {};
       if (!input.email) {
           errors.email = 'Email es obligatorio';
       } else if (!/\S+@\S+\.\S+/.test(input.email)) {
           errors.email = 'Email inválido';
       }

       if (!input.password) {
           errors.password = 'Contraseña es obligatoria';
       } 

       return errors;
   };

    render() {
        const { errors } = this.state
        return (
            <div className={`${style.container}`}>
            <form className='container' onSubmit={this.handleSubmit}>
                <div className='container'>
                    <h2 className={`${style.title}`}>Iniciar Sesión</h2>
                        <label className={`${style.label} form-control`}>Correo electrónico:</label>
                        <input autoComplete="username" type="text" name="email" id="email" placeholder="Correo electrónico..." className={`${this.state.errors.email && 'danger'}`}

                            onChange={this.handleInputChange}
                            value={this.state.loginData.email} />
                            {errors.email && (
                            <p className="text-danger">{this.state.errors.email}</p>
                    )}
                </div>
                <div className='container' >
                        <label className={`${style.label} form-control`}>Contraseña: </label>

                        <input autoComplete="current-password"
                            type="password" name="password" id="password" placeholder="Contraseña..."
                            className={`${this.state.errors.password && 'danger'} ${style.input}`}
                            onChange={this.handleInputChange}
                            value={this.state.loginData.password}
                        />
                        <p className="text-danger">
                        {
                            this.state.errors.password
                        }
                        </p>

                </div><br/>

                <button className={`${style.button}`} type="submit">Enviar</button>
             </form>
             </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sessionLogin: (usuario) => dispatch(sessionLogin(usuario)),
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Login);
