import React from 'react';
import { Link } from "react-router-dom";
import style from './Login.module.css';
import swal from 'sweetalert';
import { sessionLogin } from "../redux/actions/session.js";
import { connect } from "react-redux";
import logo from './VolunteerFormAssets/logo.jpg';
import hero from './VolunteerFormAssets/pelota.jpg';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                email: "",
                password: ""
            },
            errors: { email: 'emptyInput' },
            passwordVisibility: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.resetState = this.resetState.bind(this)
        this.setPasswordVisibility = this.setPasswordVisibility.bind(this)
        this.isNotEmpty = this.isNotEmpty.bind(this)
        
    }

   

    setPasswordVisibility() {
        this.setState(prevState => {
            return {
                ...prevState,
                passwordVisibility: !this.state.passwordVisibility
            }
        })
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState(prevState => {
            return {
                ...prevState,
                loginData: {
                    ...prevState.loginData,
                    [name]: value
                },
                errors: this.validate({
                    ...prevState.loginData,
                    [name]: value,
                })
            }
        })
    }
    

    resetState() {
        this.setState({ loginData: { email: '', password: '' }, errors: {} })
    }

    handleSubmit(e) {
        e.preventDefault();

        const errores = this.validate(this.state.loginData)
        const hayErrores = Object.entries(errores).length > 0

        if (hayErrores) {
            swal('No se pudo autenticar. Verifique los datos')
        } else {
            this.props.sessionLogin(this.state.loginData)
                .then(() => {
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

    // Para chequear si hay errores de validación y habilitar o deshabilitar botón //
    isNotEmpty(obj) {
        return Object.keys(obj).length !== 0;
      }




    render() {
        
        const { errors } = this.state
        return (
            <div className={style.container}>
               <svg viewBox="0 0 16 16" class={style.leftArrow} onClick={()=> this.props.history.push('/')} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <div className={style.formContainer}>
                    <img className={style.logo} src={logo} alt="" />
                    <div className={style.form}>
                        {!errors.email &&
                            <svg width="1.05em" height="1.05em" viewBox="0 0 16 16" className={style.check} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                            </svg>
                        }
                        <svg onClick={() => this.setPasswordVisibility()} width="1.05em" height="1.05em" viewBox="0 0 16 16" className={this.state.passwordVisibility ? style.showPass : style.passVisibility} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>

                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className={style.securePass} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>

                        <form className='container' onSubmit={this.handleSubmit}>
                            <div className='container'>
                                <h2 className={`${style.title}`}>Hola!</h2>
                                <label className={style.label}>Tu email o usuario</label>
                                <div>

                                    <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Tu email o usuario" className={style.input}

                                        onChange={this.handleInputChange}
                                        value={this.state.loginData.email} />

                                </div>
                            </div>
                            <div className='container' >


                                <input autoComplete="current-password"
                                    type={this.state.passwordVisibility ? "text" : "password"} name="password" id="password" placeholder="Tu contraseña"
                                    className={style.passInput}
                                    onChange={this.handleInputChange}
                                    value={this.state.loginData.password}
                                />

                            </div><br />

                            <button className={this.isNotEmpty(this.state.errors) ? style.disButton :style.button} disabled = {this.isNotEmpty(this.state.errors)} type="submit">Iniciar Sesión
                            <svg viewBox="0 0 16 16" className={style.rightArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                            </button>
                            <Link to = "/usuario/recuperar">
                            <p className={style.resetPassword} >¿Olvidaste tu contraseña?</p>
                            </Link>

                        </form>
                    </div>
                </div>
                <div className={style.imageHolder}>
                    <img className={style.image} src={hero} />
                    <div className={style.textContainer}>
                        <h1 className={style.oQuote}>“</h1>
                        <p className={style.paraph}> La educación es el arma mas poderosa que puedes usar para cambiar el mundo.</p>
                        <p className={style.author}> - Nelson Mandela </p>
                        <h1 className={style.cQuote}>“</h1>

                        <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" className={style.dot} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>

                    </div>
                </div>
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
