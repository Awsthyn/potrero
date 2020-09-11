import React from 'react';
import style from './Login.module.css';
import swal from 'sweetalert';

 function validate(input) {

    let errors = {};
    if (!input.email) {
        errors.email = 'Email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'Email inválido';
    }
    if (!input.password) {
        errors.password = 'Contraseña es obligatoria';
    } else if (!/(?=.*[0-9])/.test(input.password)) {
        errors.password = 'Contraseña inválida';
    }

    return errors;
};


export default function UserLogin() {
    const [input, setInput] = React.useState({
        email: '',
        password: ''


    });

const [errors, setErrors] = React.useState({});


    const handleInputChange = function(e) {
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
        setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = function(e) {
        e.preventDefault();
        onSubmit (input);
    }


    const onSubmit = function (user){
        swal("Intentando Logearte");
    }


    return (
            <div className={`${style.container}`}>

            <form action="/login" method="POST" className='container'>
                <div className='container'>
                    <h2 className={`${style.title}`}>Iniciar Sesión</h2>
                        <label for="email" className={`${style.label} form-control`}>Correo electrónico:</label>
                            <input type="text" name="email" id="email" placeholder="Correo electrónico..." className={`${errors.email && 'danger'}`}
                            onChange={handleInputChange} value={input.email} />
                            {errors.email && (
                            <p className="text-danger">{errors.email}</p>
                    )}
                </div>
                <div className='container' >
                        <label for="password" className={`${style.label} form-control`}>Contraseña: </label>
                            <input  type="password" name="password" id="password" placeholder="Contraseña..." className={`${errors.password && 'danger'} ${style.input}`}
                            onChange={handleInputChange} value={input.password} />
                            {errors.password && (
                            <p className="text-danger">{errors.password}</p>
                    )}
                </div><br/>
                        <button className={`${style.button}`} type="submit" onClick={(e) => handleSubmit(e)}>Enviar</button>
                </form>

                </div>

        )
    }