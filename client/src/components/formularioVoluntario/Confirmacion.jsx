import React from 'react'
import style from './Materias.module.css'

export default function(){
   return (
      <div>
      <div className={style.confirmacion}>
         <span className={style.check} role="img" aria-label="check"> &#10003; </span> 
      </div>
      <h2> Hola, postulante! </h2> 
      <p> Muchas gracias por postularte 
         como asesro escolar de la Fundación Potrero. </p> 

      <p> Recibimos tu postulación con éxito y pronto nos pondremos en contacto con vos. </p>  
      </div> 
   )
}
