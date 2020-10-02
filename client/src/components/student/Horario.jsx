import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import  {TimePicker}  from "@material-ui/pickers/"
import {deleteSchedule, editSchedule } from '../../redux/actions/student';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

export const Horario = ({onDelete, deleteSchedule, editSchedule, nameWeekDay}) => {
    const [start, setStart] = useState(12);
    const [end, setEnd] = useState(13);
    
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
  
      if(a!==b) Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Una o más de las condiciones que se piden no se estarían cumpliendo.'
      })
      else {
       editSchedule({start, end, nameWeekDay})}
    }
  
    const handleTime = (hour, time) => {
      let hours = moment(hour).format('LT')
      if(time == "start") {
        setStart(moment.duration(hours).asHours())
      }      
      else setEnd(moment.duration(hours).asHours())   
    }
    useEffect(()=>{
        verification()
    }, [start, end]);
    
    return(
      <div style={{width: "300px"}} className="ml-auto mr-auto">
      <h6 className="mb-n4">Desde: </h6>  
      <br/>
      <TimePicker style={{width: "80px"}} value={moment.utc(moment.duration(start+3, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e, "start")}/>
      <br/>
      <h6 className="mb-n4 mt-3">Hasta: </h6> 
      <br />
      <TimePicker style={{width: "80px"}} value={moment.utc(moment.duration(end+3, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e, "end")}/>
      <br/>
      <Button style={{marginTop: "20px", backgroundColor: '#492BC4', color: "white"}}  onClick={deleteFromRenderAndRedux}>Eliminar</Button>
      </div>
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
