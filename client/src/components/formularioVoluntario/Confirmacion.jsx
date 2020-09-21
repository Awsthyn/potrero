import React from 'react'
import {Link} from 'react-router-dom'
import style from './Materias.module.css'
import logo from '../VolunteerFormAssets/letrasLogo.png';

export default function(){
   return (
      <div>
         <div className={style.confirmacion}>
            <span className={style.check} role="img" aria-label="check"> &#10003; </span> 
         </div>
         <div className={style.contenedorLetras} > 
            <h2 className={style.tituloConfirmacion} > Hola, postulante! </h2> 
            <span className={style.letras}> 
               <p> Muchas gracias por postularte 
                  como asesor escolar de la Fundación Potrero. </p> 
               <p style={{fontSize: '13px'}} > Recibimos tu postulación con éxito y pronto nos pondremos en contacto con vos. </p>
            </span>
         </div>
         <img src={logo} className={style.letrasLogo} />
         <br/>
         <Link to='/' className={style.link} > <span style={{fontSize: '15px', marginTop: '4%'}} className="material-icons">navigate_before</span> Volver al inicio </Link> 
      </div> 
   )
}
