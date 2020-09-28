import React, {useState} from 'react';
import style from './AsesorProfile.module.css';

export default function AsesorInfo({putUser, user}){
   const [state, setState] = useState({});
   const [ edit, setEdit ] = useState(false);

   if(!putUser){
      return ( 
      <div className = {style.edit}>
         <p className = {style.asesorinfo}>Información del Asesor</p>
            <form className={style.formContainer}>
               <div>
                  <p className = {style.asesorinfo}>Nombre: {user.firstName}</p>
                  <p className = {style.asesorinfo}>Apellido: {user.lastName}</p>
                  <p className = {style.asesorinfo}>Fecha de nacimiento: {user.birthday.slice(8,10) + "/" + user.birthday.slice(5,7) + "/" + user.birthday.slice(0,4)}</p>
                  <p className = {style.asesorinfo}>Telefono: {user.phone}</p>
                  <p className = {style.asesorinfo}>E-mail: {user.email}</p>
               </div>
            </form>
      </div>
      )}

   const handleOnchange = (e) => {
      setState({
         ...state, [e.target.name]: e.target.value
      })
   }
   return (
      <div className = {style.edit}>
         <p className = {style.asesorinfo}>Información del contacto</p>
            <form className={style.formContainer}>           
               <div>
                  <input spellcheck="false" autocomplete="off" type="text" name="firstName" id="email" placeholder="Primer nombre" className={style.input} onChange={(e) => handleOnchange(e)} />
                  <input spellcheck="false" autocomplete="off" type="text" name="lastName" id="email" placeholder="Apellido" className={style.input} onChange={(e) => handleOnchange(e)} />
                  <input spellcheck="false" autocomplete="off" type="text" name="birthday" id="email" placeholder="Fecha de Nacimiento: día/mes/año" className={style.input} onChange={(e) => handleOnchange(e)}/>
                  <input spellcheck="false" autocomplete="off" type="text" name="phone" id="email" placeholder="Celular (sin el N°15)" className={style.input} onChange={(e) => handleOnchange(e)}/>
                  <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Correo Electrónico" className={style.input} onChange={(e) => handleOnchange(e)}/>
               </div>                   
               <div className = {style.btnContainer}>
                  <button onClick = {() => setEdit(!edit)} className={style.cancelBtn}>Cancelar</button>
                  <button className={style.button} type="submit" onClick={() => putUser(user.id, state)}>Modificar</button>
               </div>
            </form>
         </div>
   )
}