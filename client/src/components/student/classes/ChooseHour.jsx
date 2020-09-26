import React, {useState} from 'react'
import Horario from './Horario'
import moment from "moment"
import { TimePicker } from '@material-ui/pickers'


export default function ChooseHour({hours, id}) {
  const [start, setStart] = useState(hours[0])
  const [end, setEnd] = useState(hours[0]+ 0.5)
  
  let startToHour = hours[0] % 1 === 0 ? String(hours[0]) + ":00" : String(hours[0]).substring(0,2) + ":30"
  let endToHour = hours[1] % 1 === 0 ? String(hours[1]) + ":00" : String(hours[1]).substring(0,2) + ":30"

  const handleTime = (hour, time) => {
    let hours = moment(hour).format('LT')
    console.log(moment.duration(hours).asHours())
    console.log(time)
    time == "start" ? setStart(moment.duration(hours).asHours()) : setEnd(moment.duration(hours).asHours())
  }

  const confirmClass = () => {
    let a = 0
    let b = 0    
    a += start == end - 1 || start == end -0.5 ? 1 : 0; b += 1;
    a += start >= hours[0] ? 1 : 0; b += 1;
    a += end <= hours[1] ? 1 : 0; b += 1;
    a==b ? alert(start + '-' + end) : alert("Revise los datos ingresados")
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
      <p>Elija un rango horario ubicado entre {startToHour} y {endToHour}</p>
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
