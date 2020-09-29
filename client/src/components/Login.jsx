import React from 'react';
import { Link, withRouter } from "react-router-dom";
import style from './Login.module.css';
import swal from 'sweetalert';
import { sessionLogin } from "../redux/actions/session.js";
import { connect } from "react-redux";
import logo from './VolunteerFormAssets/logo.png'
import hero from './VolunteerFormAssets/pelota.jpg';
import hero2 from './VolunteerFormAssets/potrero2.jpg';
import hero3 from './VolunteerFormAssets/potrero3.jpg';
import Spinner from './potrero-spinner/Spinner.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                email: "",
                password: ""
            },
            errors: { email: 'emptyInput' },
            passwordVisibility: false,
            loading: false

        }


        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.resetState = this.resetState.bind(this)
        this.setPasswordVisibility = this.setPasswordVisibility.bind(this)
        this.isNotEmpty = this.isNotEmpty.bind(this)
        this.setLoading = this.setLoading.bind(this)

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

    setLoading() {
        this.setState({ loading: true })
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
            this.setLoading();

            setTimeout(() => {


                this.props.sessionLogin(this.state.loginData)
                    .then(() => {
                        this.resetState()
                        this.setState({ loading: false });
                        // uso replace para que no quede en el historial /login
                        this.props.history.replace('/admin')
                    })
                    .catch((err) => {
                        this.setState({ loading: false });
                        swal('No se pudo autenticar. Verifique los datos')
                    });
            }, 2000)
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
        const { loading } = this.state
        const { errors } = this.state


        return (
            <div >
                {loading ? <Spinner /> :
                    <div className={style.container}>
                        <svg viewBox="0 0 16 16" class={style.leftArrow} onClick={() => this.props.history.push('/')} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                        <div className={style.formContainer}>
                            <img className={style.logo} src={logo} alt="" />
                            <div className={style.form}>
                                <svg width="1.38em" height="1.38em" viewBox="0 0 16 16" className={style.at} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                                </svg>
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
                                        <label className={style.label}>Ingresá tus datos</label>
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

                                    <button className={this.isNotEmpty(this.state.errors) ? style.disButton : style.button} disabled={this.isNotEmpty(this.state.errors)} type="submit">Iniciar Sesión
                            <svg viewBox="0 0 16 16" className={style.rightArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                        </svg>
                                    </button>
                                    <Link to="/usuario/recuperar">
                                        <p className={style.resetPassword} >¿Olvidaste tu contraseña?</p>
                                    </Link>

                                </form>
                            </div>
                        </div>
                        <div className={style.imageHolder}>

                            {/* <img className={style.image} src={hero} /> */}


                            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div className="carousel-item active" >
                                        <img src={hero} className={`d-block w-100 ${style.image}`} alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={hero2} className={`d-block w-100 ${style.image}`} alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src={hero3} className={`d-block w-100 ${style.image}`} alt="..." />
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>


                            <div className={style.textContainer}>
                                <h1 className={style.oQuote}>“</h1>
                                <p className={style.paraph}> La educación es el arma mas poderosa que puedes usar para cambiar el mundo.</p>
                                <p className={style.author}> - Nelson Mandela </p>
                                <h1 className={style.cQuote}>“</h1>
                            </div>

                        </div>
                    </div>}
            </div>

        )
    }

}

function mapStateToProps(state) {
    return {
        sessionUser: state.sessions.sessionUser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        sessionLogin: (usuario) => dispatch(sessionLogin(usuario)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));