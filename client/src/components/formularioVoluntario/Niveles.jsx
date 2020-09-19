import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import styles from './VoluntarioForm.module.css';
import style from './Materias.module.css';

export default function Niveles() {
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
    var secundaria = ["Primer año","Segundo año","Tercer año","Cuarto año","Quinto año", "Sexto año"];
    if (redirect) {
        return <Redirect to="/voluntarios/materias" />;
    }
		return (
			<div>
                <div className={styles.formInput}>
                <h4 style={{fontSize: '1rem'}} >¿Cuál es el nivel educativo en el que podrías ayudar?</h4>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    { !secundario ? 
                        <div className={style.btnVolver}
                            onClick={() => handlePrimario()}>
                            {
                            !primario ? <span className={style.botonPyS}>Primario</span> : <span className={styles.testButton} id={style.back}>Volver</span> 
                            }
                        </div> : null
                    }
                    { !primario ?
                        <div
                            className={style.btnVolver}
                            onClick={() => handleSecundario()}>
                            {
                            !secundario ? <span className={style.botonPyS}>Secundario</span> : <span className={styles.testButton} id={style.back}>Volver</span> 
                            }
                        </div> : null
                    }  
                    {
                        primario && !secundario ? 
                        <div><h4 style={{fontSize: '1.2rem'}} >Niveles de primaria</h4>{/*<p>Escoge el nivel educativo al cual podrías brindar asistencia</p>*/}</div> 
                        : null
                    }  
                    {
                        secundario && !primario ? 
                        <div><h4 style={{fontSize: '1.2rem'}}>Niveles de secundaria</h4>{/*<p>Escoge el nivel educativo al cual podrías brindar asistencia</p>*/}</div>
                        : null
                    }   
                </div>
                <div className={styles.containerListNiveles}>
                {
                    primario && !secundario ?  
                        primaria.map((n, i) => <div id={n} className={style.botonMateria} key={n} onClick={(e) => handleOnClick(e,"Primaria")} style={state.Primaria === n ? {backgroundColor: 'rgb(140, 198, 62)', margin:'10px'} : {backgroundColor: 'white', margin:'10px'} }>{n}</div>)
                        : null                  
                }
                {
                    secundario && !primario ? 
                        secundaria.map((n, i) => <div   style={state.Secundaria === n ? {backgroundColor: 'rgb(140, 198, 62)', margin:'10px'} : {backgroundColor: 'white', margin:'10px'} } id={n} className={style.botonMateria}  onClick={(e) => handleOnClick(e,"Secundaria")}>{n}</div>) 
                        : null                     
                }
                </div>
                {
                (primario || secundario) && Object.keys(state).length === 1 ?
                        <Button
                        variant="contained"
                        style={{marginTop: '1%'}}
                        className={styles.testButton}
                        id={styles.skere}
                        type="submit"
                        value="Submit"
                        onClick={() => {
                        setRedirect(true);
                        }}
                    >
                    Continuar
                    <span className="material-icons">arrow_forward</span>
                    </Button>
                    : null
                }  
                {
                    primario || secundario ? null : <small>Para continuar debes especificar el máximo nivel en el cual te gustaría ayudar</small>
                }
            </div>
			</div>
		);
}

