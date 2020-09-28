import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getUserSchedule
} from '../../redux/actions/userSchedule.js';
import style from './DetalleHV.module.css';

function DetalleHorariosVoluntario( { id, schedule, getUserSchedule } ) {
    const days = ['GTM-3', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
    const timetable = ['08:00', '09:00', '10:00', '11:00', '12:00','13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
    let horarios = [{day:[], gridRow: ''}, {day:[], gridRow: ''},
    {day:[], gridRow: ''}, {day:[], gridRow: ''}, {day:[], gridRow: ''}];
    let horarioAux = Number(timetable[0].split(':')[0]);
    let intervalsAmount = [{day: 'Lunes', interval: 0}, 
        {day: 'Martes', interval: 0}, {day: 'Miercoles', interval: 0}, 
        {day: 'Jueves', interval: 0}, {day: 'Viernes', interval: 0}];
    let inter = 0;

    useEffect(() => {
        getUserSchedule(id)
    }, []);

    if (schedule.userSchedules){
        schedule.userSchedules.forEach(prop => {
            if (prop.nameWeekDay === 'Lunes'){
                inter += 1;
                intervalsAmount[0].interval += 1;
            }
            else if (prop.nameWeekDay === 'Martes'){
                inter += 1;
                intervalsAmount[1] = {day: prop.nameWeekDay, interval: inter};
            }
            else if (prop.nameWeekDay === 'Miercoles'){
                inter += 1;
                intervalsAmount[2] = {day: prop.nameWeekDay, interval: inter};
            }
            else if (prop.nameWeekDay === 'Jueves'){
                inter += 1;
                intervalsAmount[3] = {day: prop.nameWeekDay, interval: inter};
            }
            else if (prop.nameWeekDay === 'Viernes'){
                inter += 1;
                intervalsAmount[4] = {day: prop.nameWeekDay, interval: inter};
            }
        });

        intervalsAmount.forEach(int => {
            if(int.interval === 0 && int.day === 'Lunes'){
                horarios[0].gridRow = '1fr';
                horarios[0].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
            }
            else if(int.interval === 0 && int.day === 'Martes'){
                horarios[1].gridRow = '1fr';
                horarios[1].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
            }
            if(int.interval === 0 && int.day === 'Miercoles'){
                horarios[2].gridRow = '1fr';
                horarios[2].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
            }
            if(int.interval === 0 && int.day === 'Jueves'){
                horarios[3].gridRow = '1fr';
                horarios[3].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
            }
            if(int.interval === 0 && int.day === 'Viernes'){
                horarios[4].gridRow = '1fr';
                horarios[4].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
            }
            else if (int.interval > 0){
                const currentDay = schedule.userSchedules
                .filter(prop => {
                    return prop.nameWeekDay === int.day
                })
                .map(current => current.timeFrame)
                .sort((a, b) => Number(a[0].value) - Number(b[0].value));
        
                let rangoHorario;
                
                if(int.day === 'Lunes'){
                    for (const interval of currentDay) {
                        if((Number(interval[0].value) - horarioAux) > 0){
                            horarios[0].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                            rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
                            horarios[0].gridRow += `${rangoHorario}fr `;
                        }
            
                        horarios[0].day.push(<div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}}></div>)
                        rangoHorario = (Number(interval[1].value) - Number(interval[0].value)) * 2;
                        horarios[0].gridRow += `${rangoHorario}fr `;
                        horarioAux = Number(interval[1].value);
                    }
            
                    let rango = ((Number(timetable[timetable.length - 1].split(':')[0]) + 1 - horarioAux)) * 2;
            
                    if(rango > 0){
                        horarios[0].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                        horarios[0].gridRow += `${rango}fr`
                    }
                }
                else if(int.day === 'Martes'){
                    for (const interval of currentDay) {
                        if((Number(interval[0].value) - horarioAux) > 0){
                            horarios[1].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                            rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
                            horarios[1].gridRow += `${rangoHorario}fr `;
                        }
            
                        horarios[1].day.push(<div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}}></div>)
                        rangoHorario = (Number(interval[1].value) - Number(interval[0].value)) * 2;
                        horarios[1].gridRow += `${rangoHorario}fr `;
                        horarioAux = Number(interval[1].value);
                    }
            
                    let rango = ((Number(timetable[timetable.length - 1].split(':')[0]) + 1 - horarioAux)) * 2;
            
                    if(rango > 0){
                        horarios[1].push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                        horarios[1].gridRow += `${rango}fr`
                    }
                }
                else if(int.day === 'Miercoles'){
                    for (const interval of currentDay) {
                        if((Number(interval[2].value) - horarioAux) > 0){
                            horarios[1].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                            rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
                            horarios[2].gridRow += `${rangoHorario}fr `;
                        }
            
                        horarios[2].day.push(<div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}}></div>)
                        rangoHorario = (Number(interval[1].value) - Number(interval[0].value)) * 2;
                        horarios[2].gridRow += `${rangoHorario}fr `;
                        horarioAux = Number(interval[1].value);
                    }
            
                    let rango = ((Number(timetable[timetable.length - 1].split(':')[0]) + 1 - horarioAux)) * 2;
            
                    if(rango > 0){
                        horarios[2].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                        horarios[2].gridRow += `${rango}fr`
                    }
                }
                else if(int.day === 'Jueves'){
                    for (const interval of currentDay) {
                        if((Number(interval[0].value) - horarioAux) > 0){
                            horarios[3].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                            rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
                            horarios[3].gridRow += `${rangoHorario}fr `;
                        }
            
                        horarios[3].day.push(<div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}}></div>)
                        rangoHorario = (Number(interval[1].value) - Number(interval[0].value)) * 2;
                        horarios[3].gridRow += `${rangoHorario}fr `;
                        horarioAux = Number(interval[1].value);
                    }
            
                    let rango = ((Number(timetable[timetable.length - 1].split(':')[0]) + 1 - horarioAux)) * 2;
            
                    if(rango > 0){
                        horarios[3].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                        horarios[3].gridRow += `${rango}fr`
                    }
                }
                else if(int.day === 'Viernes'){
                    for (const interval of currentDay) {
                        if((Number(interval[0].value) - horarioAux) > 0){
                            horarios[4].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                            rangoHorario = (Number(interval[0].value) - horarioAux) * 2;
                            horarios[4].gridRow += `${rangoHorario}fr `;
                        }
            
                        horarios[4].day.push(<div style={{border:'1px solid whitesmoke', borderWidth:'2px 0', backgroundColor:'#8CC63F'}}></div>)
                        rangoHorario = (Number(interval[1].value) - Number(interval[0].value)) * 2;
                        horarios[4].gridRow += `${rangoHorario}fr `;
                        horarioAux = Number(interval[1].value);
                    }
            
                    let rango = ((Number(timetable[timetable.length - 1].split(':')[0]) + 1 - horarioAux)) * 2;
            
                    if(rango > 0){
                        horarios[4].day.push(<div style={{backgroundColor:'whitesmoke'}}></div>)
                        horarios[4].gridRow += `${rango}fr`
                    }
                }
            }
        })
    };

    return (
        <div className={style.container}>
            <h3 className={style.title}>Horarios del voluntario</h3>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div style={{display:'flex', justifyContent:'flex-start', width:'250px'}}><div style={{alignSelf:'center', width:'30px', height:'15px', backgroundColor:'#8CC63F', display:'inline-block'}}></div><span style={{marginLeft:'5px'}}>Horario seleccionado</span></div>
                <div style={{display:'flex', justifyContent:'flex-start', width:'250px'}}><div style={{alignSelf:'center', width:'30px', height:'15px', backgroundColor:'whitesmoke', display:'inline-block'}}></div><span style={{marginLeft:'5px'}}>Horario libre</span></div>
                <div></div>
            </div>
            <div className={style.catainerDays}>
                {days.map(day => <div className={style.catainerOneDay}>{day}</div>)}
            </div>
            <div className={style.box}>
                <div className={style.catainerTimetable}>
                    <div>{timetable.map(time => <div className={style.catainerOneTimetable}>{time}</div>)}</div>
                    <div className={style.schedule}>
                        { schedule.userSchedules &&  horarios.map(horario => {
                            return (
                                <div className={style.boxHorario} style={{gridTemplateRows:`${horario.gridRow}`}}>
                                    {horario.day}
                                </div>
                            ) 
                        })}
                    </div>
                </div>
            </div>
            <svg viewBox="0 0 16 16" class={style.leftArrow} onClick={()=> window.history.go(-1)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
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
