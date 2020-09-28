import React, {useState} from 'react'
import moment from "moment"
import { TimePicker } from '@material-ui/pickers'
import Swal from 'sweetalert2'

import {postClass} from '../../../redux/actions/class'


export default function ChooseHour({friendlyData, userData, hours, id}) {
  const [start, setStart] = useState(hours[0])
  const [end, setEnd] = useState(hours[0]+ 0.5)
  
  let startToHour = hours[0] % 1 === 0 ? String(hours[0]) + ":00" : String(hours[0]).substring(0,2) + ":30"
  let endToHour = hours[1] % 1 === 0 ? String(hours[1]) + ":00" : String(hours[1]).substring(0,2) + ":30"
  const handleTime = (hour, time) => {
    let hours = moment(hour).format('LT')
    time == "start" ? setStart(moment.duration(hours).asHours()) : setEnd(moment.duration(hours).asHours())
  }

  const confirmClass = () => {
    //Comprobaciones para que la clase creada cumpla los requisitos de horario
    let a = 0
    let b = 0  
    //Clase debe durar 30 (0.5 hora) o 60 (1 hora) minutos  
    a += start == end - 1 || start == end -0.5 ? 1 : 0; b += 1;
    //El horario de inicio de la clase creada no puede ser menor al limite inferior del rango de disponibilidad
    a += start >= hours[0] ? 1 : 0; b += 1;
    //El horario de finalizado de la clase creada no puede ser mayor al limite superior del rango de disponibilidad
    a += end <= hours[1] ? 1 : 0; b += 1;
    if(a===b){
      Swal.fire({
        title: '¿Desea confirmar la creación de la clase?',
        text: `Se creará una clase de ${friendlyData.subject} 
        desde ${start % 1 === 0 ? String(start) + ":00" : String(start).substring(0,2) + ":30"} a  ${end % 1 === 0 ? String(end) + ":00" : String(end).substring(0,2) + ":30"} hs
        Alumno: ${friendlyData.name},
        Asesor: ${userData}`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Crear clase`,
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        result.isConfirmed && Swal.fire('Clase creada', '', 'success')
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Una o más de las condiciones que se piden no se estarían cumpliendo.',
      })
    }
  }

    return (
<div className="modal fade" id={"hourModal" + id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-center" id="exampleModalLabel">Crear clase</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <p>Elija un rango horario ubicado entre {startToHour} y {endToHour} hs.</p>
      <p>Las clases deben tener una duración de 30 o 60 minutos.</p>
      <h5 className="">Inicio</h5>
      <TimePicker style={{width: "80px"}} value={moment.utc(moment.duration(start+3, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e, "start")} />

      <h5 className="mt-4">Fin</h5>
      <TimePicker style={{width: "80px"}} value={moment.utc(moment.duration(end+3, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e, "end")} />     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={() => confirmClass()}>Agregar clase</button>
      </div>
    </div>
  </div>
</div>
    )
}
