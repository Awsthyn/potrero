import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getUserSchedule
} from '../../redux/actions/userSchedule.js';
import style from './DetalleHV.module.css'

const VIOLETA = '#492BC4';
const VERDE = '#8CC63E';
const NEGRO = '#333333';

function DetalleHorariosVoluntario( { id, schedule, getUserSchedule } ) {
    const days = ['GTM-3', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
    const timetable = ['08:00', '09:00', '10:00', '11:00', '12:00','13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
    let horarios = [];

    useEffect(() => {
        getUserSchedule(id)
    }, []);

    // for( const time of timetable ){
    //     if (schedule.userSchedules){
    //         for(const sch of schedule.userSchedules){
    //             if(sch.nameWeekDay === 'Lunes'){
                    // if((Number(sch.timeFrame[0].value) < Number(time.split(':')[0])) && (Number(sch.timeFrame[1].value) > Number(time.split(':')[0]))){
                    //     horarios.push(<div key={sch.id} className={style.igualdad}>
                    //         <div className={style.divsInternos}>nan sarasa</div>
                    //         <div className={style.divsInternos}>jeremias sarasa</div>
                    //     </div>)
                    // }
                    // else 
    //                 if(Number(sch.timeFrame[0].value) - Number(time.split(':')[0]) === 0.5 || Number(sch.timeFrame[0].value) - Number(time.split(':')[0]) === -0.5){
    //                     console.log('key',sch)
    //                     horarios.push(<div key={sch.id} className={style.igualdad}>
    //                         <div className={style.divsInterno2}>nan sarasa</div>
    //                         <div className={style.divsInternos}>jeremias sarasa</div>
    //                     </div>)
    //                 }
    //             }
    //         }
    //     }
    //     horarios.push(<div className={style.boxHorario}>No</div>)
    // }

    // if(horarios){
    //     horarios.map((horario, index) => {
    //         console.log(horario)
    //         if (horario.key){
    //             console.log('key horario', horario.key)
    //             horarios.splice((index + 1), 1);
    //         }
    //     })
    // }




    let horarioAux = Number(timetable[0].split(':')[0]);
    let intervalsAmount = 0;
    let gridRow = '';

    if (schedule.userSchedules){
        schedule.userSchedules.forEach(prop => {
            if (prop.nameWeekDay === 'Lunes')
                intervalsAmount += 1;
        });
    }

    if(intervalsAmount === 0){
        gridRow = '1fr';
        return (<div style={{backgroundColor:'whitesmoke'}}></div>)
    }
    else{
        const currentDay = schedule.userSchedules
        .filter(prop => {
            return prop.nameWeekDay === 'Lunes'
        })
        .map(current => current.timeFrame)
        .sort((a, b) => Number(a[0].value) - Number(b[0].value));

        let rangoHorario;
        
        for (const interval of currentDay) {
            if((Number(interval[0].value) - horarioAux) > 0){
                horarios.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
                gridRow += `${rangoHorario}fr `;
            }

            horarios.push(<div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}}></div>)
            rangoHorario = (Number(interval[1].value) - Number(interval[0].value)) * 2;
            gridRow += `${rangoHorario}fr `;
            horarioAux = Number(interval[1].value);
        }

        let rango = ((Number(timetable[timetable.length - 1].split(':')[0]) + 1 - horarioAux)) * 2;

        if(rango > 0){
            horarios.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
            gridRow += `${rango}fr`
        }
        console.log(gridRow)
    }

    return (
        <div className={style.container}>
            <div className={style.catainerDays}>
                {days.map(day => <div className={style.catainerOneDay}>{day}</div>)}
            </div>
            <div className={style.box}>
                <div className={style.catainerTimetable}>
                    <div>{timetable.map(time => <div className={style.catainerOneTimetable}>{time}</div>)}</div>
                    <div className={style.schedule}>
                        
                        
                        <div className={style.boxHorario} style={{gridTemplateRows:`${gridRow}`}}>
                            {/* <div style={{backgroundColor:'whitesmoke'}} >1</div>
                            <div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}} >2</div>
                            <div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}} >3</div>
                            <div style={{backgroundColor:'whitesmoke'}} >4</div> */}
                            {horarios}
                        </div>

                        {/* { */}
                            {/* timetable.map(time => {
                                return(
                                    <div className={style.horarios}>
                                        {schedule.userSchedules && schedule.userSchedules.map(sch => {
                                            if(sch.nameWeekDay === 'Lunes'){
                                                console.log(sch.timeFrame[0].value)
                                                console.log(sch.timeFrame[1].value)
                                                    console.log('TIME', Number(time.split(':')[0]))
                                                    console.log('TIMEFRAME', Number(Math.floor(sch.timeFrame[0].value)))
                                                if(Number(time.split(':')[0]) === Number(Math.floor(sch.timeFrame[0].value))){
                                                    console.log('IGUALDAD', Number(time.split(':')[0]) === Number(Math.floor(sch.timeFrame[0].value)))
                                                    return <div className={style.igualdad} style={{backgroundColor:'black'}}>Yes</div>
                                                }
                                                else{
                                                    return <div className={style.boxHorario}>No</div>

                                                }
                                            }
                                        })}
                                        <div className={style.boxHorario}></div>
                                        <div className={style.boxHorario}></div>
                                        <div className={style.boxHorario}></div>
                                        <div className={style.boxHorario}></div>
                                    </div>
                                )
                            }) */}
                        {/* } */}
                        {/* {
                            timetable.map(time => {
                                return( */}
                                    {/* {horarios} */}
                                {/* )
                            })
                        } */}
                    </div>
                </div>
                {/* <div className={style.schedule}>
                    {schedule.userSchedules && schedule.userSchedules.forEach(sch => sch.timeFrame.forEach(time => console.log(time)))}
                </div> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    schedule: state.userSchedule.schedule,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUserSchedule: (id) => dispatch(getUserSchedule(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetalleHorariosVoluntario);
