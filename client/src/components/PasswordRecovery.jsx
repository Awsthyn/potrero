import React from 'react';
import logo from './VolunteerFormAssets/logo.jpg';
import style from './PasswordRecovery.module.css';

export class PasswordRecovery extends React.Component {
    constructor(props) {
        super(props);
       
        
       
    }

    render() {
        
        
        return (
            <div className={style.container}>
                <svg onClick={()=> this.props.history.push('/usuario/login')} viewBox="0 0 16 16" class={style.leftArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <div className={style.formContainer}>
                    <img className={style.logo} src={logo} alt="" />
                    <div className={style.form}>
                        
                            <svg width="1.05em" height="1.05em" viewBox="0 0 16 16" className={style.check} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                            </svg>
                        
                

                        <form className='container' onSubmit={this.handleSubmit}>
                            <div className='container'>
                                <h2 className={`${style.title}`}>¿Olvidaste tu contraseña?</h2>
                                <label className={style.label}>Ingresá tu email para que podamos enviarte un token de acceso. </label>
                                <div>

                                    <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" className={style.input}

                                        onChange={this.handleInputChange}
                                      />

                                </div>
                            </div>
                            <div className='container' >


                            </div><br />

                            <button className={style.button} disabled type="submit">Enviar token
                                    <svg viewBox="0 0 16 16" className={style.rightArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>
                           
                            
                            

                        </form>
                    </div>
                </div>
                
            </div>

        )
    }
}


export default PasswordRecovery;