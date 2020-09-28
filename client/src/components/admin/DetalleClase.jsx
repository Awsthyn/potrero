import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Faltas from "./Faltas";
import style from "./DetalleClase.module.css";
import Datasheet from "./dataSheet/DataSheet";

export default function DetalleClase() {
    return(
        <div className={style.integrantes}>
            <div className={style}>
                <div>Asesor</div>
                <div>Alumno</div>    
                <button>Asistió</button> <Faltas/>
            </div>
            <Datasheet/>
        </div>
        
    )
}
