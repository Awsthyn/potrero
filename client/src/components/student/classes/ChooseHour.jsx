import React, {useState} from 'react'
import Horario from './Horario'
import moment from "moment"
import { TimePicker } from '@material-ui/pickers'


export default function ChooseHour({hours, id}) {
  const [start, setStart] = useState(hours[0])
  const [end, setEnd] = useState(hours[0]+ 0.5)
  //
  const handleTime = (hour) => {
    let hours = moment(hour).format('LT')
    console.log(moment.duration(hours).asHours())
    setStart(moment.duration(hours).asHours())
  }
  //let hourToTime = moment.duration(start, 'hours')
  //hourToTime._data.hours + ':' + hourToTime._data.minutes
  console.log(moment.utc(moment.duration(end, "hours").asMilliseconds()).format())

    return (
<div className="modal fade" id={"hourModal" + id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Elija un horario</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <TimePicker value={moment.utc(moment.duration(start, "hours").asMilliseconds()).format()} minutesStep={30} onChange={(e)=> handleTime(e)} />     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary">Agregar clase</button>
      </div>
    </div>
  </div>
</div>
    )
}
