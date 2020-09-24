//import AllAssistancesStudents from './AllAssistancesStudents.jsx';
import MiStats from './MiStats.jsx';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Bar, Line, Pie} from 'react-chartjs-2';
import * as actions from '../../redux/actions/stats.js';
//<AllAssistancesStudents />
export default function AllStats(){
    return(
        <div className="container">
            <div>
            <h1>Estadísticas generales</h1>

                    <MiStats />
                </div>
                <br />
            <div>
            <h1>Oferta de materias y demanda de asistencia</h1>
                    <span>Zarasasasa</span>
                </div>
        </div>
    )
}
