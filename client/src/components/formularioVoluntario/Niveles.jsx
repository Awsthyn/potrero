import React, { useState } from 'react';
import style from './Materias.module.css';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

export default function Niveles({history}) {
    const [primario, setPrimario] = useState(false);
    const [secundario, setSecundario] = useState(false);
    const [state, setState] = useState({});
    const [redirect, setRedirect] = useState(false);
    const handlePrimario = () => {
        if (!primario) {
            setPrimario(true)
            setSecundario(false)
        } else {
            setPrimario(false)
            setState({})
        }
    }
    const handleSecundario = () => {
        if (!secundario) {
            setSecundario(true)
            setPrimario(false)
        } else {
            setSecundario(false)
            setState({})
        }
    }
    const handleOnClick = (e, nivel) => {
        setState({
             [nivel] : e.target.id
        })
    }
    var primaria = ["Primer grado","Segundo grado","Tercer grado","Cuarto grado","Quinto Grado","Sexto grado","Septimo grado"];
    var secundaria = ["Primer año","Segundo año","Tercer año","Cuarto año","Quinto año"];
    if (redirect) {
        return <Redirect to="/voluntarios/materias" />;
    }
		return (
			<div>
                <IconButton aria-label="ir atrás" onClick={() => history.push('/voluntarios/horarios')}>
				<span className="material-icons">arrow_back</span>
				</IconButton>
                <h4>¿Cual es el nivel superior en el cual podrías ayudar?</h4>
                <div>
                    { !secundario ? 
                        <div
                            className={style.botonPyS}
                            onClick={() => handlePrimario()}>
                            {
                               !primario ? <span>Primario</span> : <span>Volver</span> 
                            }
                        </div> : null
                    }
                    { !primario ?
                        <div
                            className={style.botonPyS}
                            onClick={() => handleSecundario()}>
                            {
                               !secundario ? <span>Secundario</span> : <span>Volver</span> 
                            }
                        </div> : null
                    }  
                    {
                        primario && !secundario ? 
                        <div><h4>Niveles de primaria</h4><p>escoge el maximo nivel al que estas capacitado para enseñar</p></div> 
                        : null
                    }  
                    {
                        secundario && !primario ? 
                        <div><h4>Niveles de secundaria</h4><p>escoge el maximo nivel al que estas capacitado para enseñar</p></div>
                        : null
                    }   
                </div>
                <div>
                {
                    primario && !secundario ?  
                          primaria.map((n, i) => <div id={n} className={style.botonMateria}  onClick={(e) => handleOnClick(e,"Primaria")}>{n}</div>)
                          : null                  
                }
                {
                    secundario && !primario ? 
                          secundaria.map((n, i) => <div id={n} className={style.botonMateria}  onClick={(e) => handleOnClick(e,"Secundaria")}>{n}</div>) 
                          : null                     
                }
                </div>
                {
                  (primario || secundario) && Object.keys(state).length === 1 ?
                        <Button
                        variant="contained"
                        style={{marginTop: '3rem'}}
                        className={style.skere}
                        type="submit"
                        value="Submit"
                        onClick={() => {
                        setRedirect(true);
                        }}>
                        Continuar
                        <span className="material-icons">trending_flat</span>
                        </Button>
                        : null
                }  
                {
                    primario || secundario ? null : <h5>Para continuar debes especificar el máximo nivel en el cual te gustaría ayudar</h5>
                }
			</div>
		);
}

