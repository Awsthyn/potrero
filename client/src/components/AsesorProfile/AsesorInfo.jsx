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
                  <p className = {style.asesorinfo}><strong> Nombre: </strong> {user.firstName}</p>
                  <p className = {style.asesorinfo}><strong>Apellido: </strong>{user.lastName}</p>
                  <p className = {style.asesorinfo}><strong>Fecha de nacimiento: </strong>{user.birthday.slice(8,10) + "/" + user.birthday.slice(5,7) + "/" + user.birthday.slice(0,4)}</p>
                  <p className = {style.asesorinfo}><strong>Telefono: </strong>{user.phone}</p>
                  <p className = {style.asesorinfo}><strong>E-mail: </strong>{user.email}</p>
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
                  <input spellCheck="false" autoComplete="off" type="text" name="firstName" id="email" Value={user.firstName} className={style.input} onChange={(e) => handleOnchange(e)} />
                  <input spellCheck="false" autoComplete="off" type="text" name="lastName" id="email" Value={user.lastName} className={style.input} onChange={(e) => handleOnchange(e)} />
                  <input spellCheck="false" autoComplete="off" type="text" name="birthday" id="email" Value={user.birthday.slice(8,10) + "/" + user.birthday.slice(5,7) + "/" + user.birthday.slice(0,4)} className={style.input} onChange={(e) => handleOnchange(e)}/>
                  <input spellCheck="false" autoComplete="off" type="text" name="phone" id="email" Value={user.phone} className={style.input} onChange={(e) => handleOnchange(e)}/>
                  <input spellCheck="false" autoComplete="off" type="text" name="email" id="email" Value={user.email} className={style.input} onChange={(e) => handleOnchange(e)}/>
               </div>                   
               <div className = {style.btnContainer}>
                  <button onClick = {() => setEdit(!edit)} className={style.cancelBtn}>Cancelar</button>
                  <button className={style.button} type="submit" onClick={() => putUser(user.id, state)}>Modificar</button>
               </div>
            </form>
         </div>
   )
}