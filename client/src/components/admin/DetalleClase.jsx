import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Faltas from "./Faltas";
import style from "./DetalleClase.module.css";
import Datasheet from "./dataSheet/DataSheet";

export default function DetalleClase() {
    return(
        <div className={style.contenedor}>
            <div className={style.integrantes}>
                <div>
                    <div className={style.personas}>Asesor</div>
                    <div className={style.personas}>Alumno</div>    
                </div>
                <button>Asistió</button> <Faltas className={style.botones}/>
            </div>
            <Datasheet/>
        </div>
        
    )
}
