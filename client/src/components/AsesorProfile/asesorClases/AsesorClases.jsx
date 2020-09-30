import React, {useEffect, useState} from 'react'
import style from './AsesorClases.module.css';

export default function AsesorClases({clase}){
   const [horario, setHorario] = useState([])
   useEffect(() => {
      setHorario(clase.duration.map(h => {
         if(h.value < 10 && h.value%1 !== 0){
            return '0' + (h.value - 0.5 )+ ':30'
         }else if(h.value < 10 && h.value%1 === 0){
            return '0' + h.value + ':00'
         }else if(h.value >  10 && h.value%1 === 0){
            return h.value + ':00'
         }else if(h.value > 10 && h.value%1 !== 0){
            return (h.value - 0.5) + ':30'
         }
      }))
   }, [])

   return (
         <div className = {style.container}>
            <div className = {style.student}>
               <h4 className = {style.name} >{clase.firstName}</h4>
            </div>
            <div className = {style.info}>
               <p className = {style.data}>{clase.nameWeekDay}</p>
               <p className = {style.data}>de: {horario[0]} hs a {horario[1]} hs</p>
               <p className = {style.data}>{clase.subject.name}</p>
            </div>
         </div>
   )
}

