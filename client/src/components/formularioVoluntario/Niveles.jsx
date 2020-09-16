import React, { useState } from 'react';
import style from './Materias.module.css';

export default function Niveles() {
    const [primario, setPrimario] = useState(false)
    const [secundario, setSecundario] = useState(false)
    const handlePrimario = () => {
        if (!primario) {
            setPrimario(true)
        } else {
            setPrimario(false)
        }
    }
    const handleSecundario = () => {
        if (!secundario) {
            setSecundario(true)
        } else {
            setSecundario(false)
        }
    }
		return (
			<div>
                <h4>¿Cual es el nivel superior en el cual podrias ayudar?</h4>
                <div>
                    <div
                        className={style.botonMateria}
                        onClick={() => handlePrimario()}>
                        Primario
                    </div>
                    <div
                        className={style.botonMateria}
                        onClick={() => handleSecundario()}>
                        Secundario
                    </div>
                </div>
                {
                    primario ? <div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Primer grado</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Segundo grado</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Tercer grado</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Cuarto grado</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Quinto grado</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Sexto grado</div>
                               </div>
                             : null  
                }
                 {
                    secundario ? <div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Primer año</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Segundo año</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Tercer año</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Cuarto año</div>
                                    <div className={style.botonMateria} onClick={() => handlePrimario()}>Quinto año</div>
                               </div>
                             : null  
                }
			</div>
		);
}

