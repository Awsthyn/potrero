import React, {useEffect, useState} from 'react'
import style from '../asesorClases/AsesorClases.module.css';
import axios from 'axios'

export default function ClassDataSheet({data, clase}){
   // const [data, setData] = useState()

   // useEffect(() => {
   //    axios.get(`http://localhost:3001/datasheet/${userId}`)
   //    .then(res => setData(res.data))
   //    .catch(error => console.log(error))
   // }, [])
   // console.log(clase)
   console.log(data)
   return (
      <div>
      <h3 style={{fontFamily: "Poppins", textAlign:"center", marginTop:"30px"}}>Clases de el día {clase.nameWeekDay} a {clase.student.firstName} {clase.student.lastName}</h3>
      <div className={style.wrap} >
         {data?.map(s =>  
         <div className = {style.containerData} key={s.id} >
            <div className = {style.info}>
               <p className = {style.data}>Relación con alumno: {s?.relation}{s?.relation ?'/5' :' '}</p>
               <p className = {style.data}>Repercucion: {s?.difference}{s?.difference ?'/5' :' '}</p>
               <p className = {style.data}>Valoracion: {s?.valued}{s?.valued ?'/5' :' '}</p>
               <p className = {style.data}>Seguir trabajando: {s?.stay ? "si" : "no"}</p>
               <p className = {style.data}>Desempeño: {s?.performance}{ s?.performance ?'/5' :' '}</p>
               <p className = {style.data}>Asistencia: {s?.assistance}</p>
               <p className = {style.data}>Actitud del alumno: {s?.attitude}{s?.attitude ?'/5' :' '} </p>
               <p className = {style.data}>Comentarios: {s?.comments ? s?.comments : "Sin comentarios"}</p>
               <p className = {style.data}>Calificación último examen: {s?.qualification || 'no'} </p>
               <p className = {style.data}>Formulario creado el: {s?.createdAt.slice(8,10) + "/" + s?.createdAt.slice(5,7) + "/" + s?.createdAt.slice(0,4)} </p>
            </div>
         </div> )}
      </div>
      </div>
   )
}