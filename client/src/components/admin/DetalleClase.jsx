import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Faltas from "./Faltas";
export default function DetalleClase() {
    return(
        <div>
            <div>
                <div>Asesor</div>
                <div>Alumno</div>
            </div>
            <button>Asistió</button> <Faltas/>
        </div>
        
    )
}
