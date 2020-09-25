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
    const days = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
    const timetable = ['08:00', '09:00', '10:00', '11:00', '12:00','13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

    useEffect(() => {
        getUserSchedule(id)
    }, [])

    return (
        <div className={style.container}>
            <div className={style.catainerDays}>
                {days.map(day => <div className={style.catainerOneDay}>{day}</div>)}
            </div>
            <div className={style.box}>
                <div className={style.catainerTimetable}>
                    <div>{timetable.map(time => <div className={style.catainerOneTimetable}>{time}</div>)}</div>
                    <div className={style.schedule}>
                        {
                            timetable.map(time => {
                                return(
                                    <div className={style.horarios}>
                                        <div>1</div>
                                        <div>2</div>
                                        <div>3</div>
                                        <div>4</div>
                                        <div>5</div>
                                    </div>
                                )
                            })
                        }
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
