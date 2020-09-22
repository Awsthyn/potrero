import AllAssistancesStudents from './AllAssistancesStudents.jsx';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Bar, Line, Pie} from 'react-chartjs-2';
import * as actions from '../../redux/actions/stats.js';

export default function AllStats(){
    return(
        <div className="container">
            <div>
            <h1>Estadísticas generales</h1>
                    <AllAssistancesStudents />
                </div>
                <br />
            <div>
            <h1>Oferta de materias y demanda de asistencia</h1>
                    <span>Zarasasasa</span>
                </div>
        </div>
    )
}