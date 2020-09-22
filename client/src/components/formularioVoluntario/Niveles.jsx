import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import styles from './VoluntarioForm.module.css';
import style from './Materias.module.css';
import {getAcademicLevels} from '../../redux/actions/academicLevel';
import { connect } from 'react-redux';

 function Niveles({getAcademicLevels, academicLevels}) {
    const [primario, setPrimario] = useState(false);
    const [secundario, setSecundario] = useState(false);
    const [state, setState] = useState({});
    const [redirect, setRedirect] = useState(false);
    console.log(academicLevels)
    
    const handlePrimario = () => {
        getAcademicLevels()
        if (!primario) {
            setPrimario(true)
            setSecundario(false)
        } else {
            setPrimario(false)
            setState({})
        }
    }
    
    const handleSecundario = () => {
        getAcademicLevels()
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
                <span className={styles.frase}>  
				<p style={{fontSize:'1.3rem', margin: '0px', marginRight: '24%'}} ><strong> Nivel Educativo </strong></p>
				<span style={{fontWeight: 100, color: 'gray', fontSize: '15px'}} > ¿Cuál es el nivel educativo en el que podrías brindar asistencia? </span>
				</span>
                <div className={styles.formInput}>
                <h4 style={{fontSize: '1rem', marginTop: '15px'}} > Escoge el nivel educativo en el cual podrías ayudar </h4>
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
                        <div><h4 style={{fontSize: '1.2rem'}} >Niveles de primaria</h4></div> 
                        : null
                    }  
                    {
                        secundario && !primario ? 
                        <div><h4 style={{fontSize: '1.2rem'}}>Niveles de secundaria</h4></div>
                        : null
                    }   
                </div>
                <div className={styles.containerListNiveles}>
                {
                    primario && !secundario ?  
                    academicLevels.map((n, i) => { if(n?.educationLevel?.name === "Primaria"){
                    return <div id={n.name} className={style.botonMateria} key={n.name} onClick={(e) => handleOnClick(e,"Primaria")} style={state.Primaria === n.name ? {backgroundColor: 'rgb(140, 198, 62)', margin:'10px'} : {backgroundColor: 'white', margin:'10px'} }>{n.name}</div>
                    }})
                    : null 
                } 
                {
                    secundario && !primario ? 
                    academicLevels.map((n, i) => { if(n?.educationLevel?.name === "Secundaria"){
                        return <div id={n.name} className={style.botonMateria} key={n.name} onClick={(e) => handleOnClick(e,"Secundaria")} style={state.Secundaria === n.name ? {backgroundColor: 'rgb(140, 198, 62)', margin:'10px'} : {backgroundColor: 'white', margin:'10px'} }>{n.name}</div>
                        }})
                        : null                    
                }
                </div>
                        <Button
                        variant="contained"
                        style={(primario || secundario) && Object.keys(state).length === 1 ? {marginTop: '1%'} :{visibility: 'hidden'}}
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
                {
                    primario || secundario ? null : <small>Para continuar debes especificar el máximo nivel en el cual te gustaría ayudar</small>
                }
            </div>
			</div>
		);
}

function mapStateToProps(state){
    console.log(state)
    return {
        academicLevels: state.academic.academicLevels,
    } 
}

export default connect(mapStateToProps, {getAcademicLevels})(Niveles)