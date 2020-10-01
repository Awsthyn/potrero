import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import  {TimePicker}  from "@material-ui/pickers/"
import {deleteSchedule, editSchedule } from '../../redux/actions/student';
import moment from 'moment';
import 'moment/locale/es';


export const Horario = ({onDelete, deleteSchedule, editSchedule, nameWeekDay}) => {
    const [start, setStart] = useState(12)
    const [end, setEnd] = useState(13)
    
    const deleteFromRenderAndRedux = () => {
        onDelete()
        deleteSchedule({nameWeekDay})
    }

    const verification = () => {
      //Comprobaciones para que el schedule creado cumpla los requisitos de horario
      let a = 0
      let b = 0  
      //Schedule mínimo una hora de duración
      a += start <= end -1 ? 1 : 0; b += 1;
      //El horario de inicio del schedule no puede ser menor a 8
      a += start >= 8 ? 1 : 0; b += 1;
      //El horario de finalizado del schedule no puede ser mayor a 20
      a += end <= 20 ? 1 : 0; b += 1;
  
      if(a!==b) alert("Corregir datos")
      else {
       editSchedule({start, end, nameWeekDay})}
    }
  
    const handleTime = (hour, time) => {
      let hours = moment(hour).format('LT')
      if(time == "start") {
        setStart(moment.duration(hours).asHours())}      
        else setEnd(moment.duration(hours).asHours())   
    }
    useEffect(()=>{
        verification()
    }, [start, end])
    return(
      <>
      <TimePicker value={moment.utc(moment.duration(start+3, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e, "start")}/>
      <TimePicker value={moment.utc(moment.duration(end+3, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e, "end")}/>
      <Button  onClick={deleteFromRenderAndRedux}>Eliminar</Button>
      </>
    )
}

const mapStateToProps = (state) => ({
    schedule: state.studentForm
})

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSchedule: (data) => dispatch(deleteSchedule(data)),
        editSchedule: (data) => dispatch(editSchedule(data))

    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Horario)
