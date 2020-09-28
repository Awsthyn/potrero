import React, {useState} from 'react'
import style from './AsesorProfile.module.css';
import axios from "axios";

export default function EnviarEmail({user}){
   const [enviar, setEnviar] = useState({});

   const handleSendEmail = () => {
      axios
         .post('http://localhost:3001/mailPersonal/asesorEmail', enviar, {withCredentials: true})
         .then(res => console.log(res))
         .catch(err => console.log(err));
      };
   return (
      <div className = {style.edit}>
         <p className = {style.asesorinfo}>Enviar e-mail a: {user.email}</p>
            <form className={style.formContainer}>
               <div>
                  <input spellcheck="false" autocomplete="off" type="text" name="asunto" id="asunto" placeholder="Asunto" className={style.input} onChange={(e) => setEnviar({...enviar, [e.target.name]: e.target.value})} />
                  <textarea  name="mensaje" placeholder="Mensaje" className={style.bodyMessage} onChange={(e) => setEnviar({...enviar, [e.target.name]: e.target.value, email: user.email})}></textarea>
                  <button disabled={!enviar.mensaje ? true : false} className={!enviar.mensaje ? style.sendEmailFalse : style.sendEmailTrue} style={{display: "flex", alignItems: "center"}}  onClick={() => handleSendEmail()}>Enviar e-mail<span style={{margin: "10px"}} className="material-icons">send</span></button>
               </div>
            </form>
      </div>
   )
}