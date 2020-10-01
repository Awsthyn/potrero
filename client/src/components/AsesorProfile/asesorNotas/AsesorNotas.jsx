import React, {useEffect, useState} from 'react'
import style from '../asesorClases/AsesorClases.module.css';
import axios from 'axios'

export default function AsesorClases({userId}){
   const [data, setData] = useState()

   useEffect(() => {
      axios.get(`http://localhost:3001/datasheet/${userId}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error))
   }, [])
   console.log(data)
   return (
      <div className = {style.container}>
         {data?.map(s => 
         <div key={s.id} >
            <div className = {style.student}>
               {/*<h4 className = {style.name} >{s?.class.nameWeekDay}</h4>*/}
               <p className = {style.s}> {s.class.duration[0].value} hs</p>
            </div>
            <div className = {style.info}>
               <p className = {style.data}>Asistencia: {s?.assistance}</p>
               <p className = {style.data}>Actitud del alumno: {s?.attitude}/5</p>
               <p className = {style.data}>Desempeño: {s?.performance}/5</p>
               <p className = {style.data}>Comentarios: {s?.comments}</p>
               <p className = {style.data}>Calificación último examen: {s?.qualification || 'no'} </p>
            </div>
         </div> )}
      </div>
   )
}