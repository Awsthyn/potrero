import React, { useState } from 'react';
import style from './AsesorProfile.module.css';
import AsesorStudents from './AsesorStudents/AsesorStudents.jsx';
import { ExpansionPanelDetails } from '@material-ui/core';



export default function AsesorProfile () {

    let subjects = ['Matemáticas', 'Lengua y Literatura', 'Ciencias Sociales', 'Ciencias Naturales', 'Inglés', 'Formación Ética y Ciudadana' ]

    const [ edit, setEdit ] = useState(false);

return(
    <div className = {style.outer}>
    <div className = {style.container}>
        
        <div className = {style.profile}>
        
        <svg viewBox="0 0 16 16" class={style.leftArrow} onClick={()=> this.props.history.push('/')} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>

        <img className = {style.photo} src = "https://hackspirit.com/wp-content/uploads/2017/10/male-1.jpg" alt = ""/>
        <h4 className = {style.name}>Juan Sepulveda
        <svg onClick = {() => setEdit(!edit)} width="0.9em" height="0.9em" className = {style.icon} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        </h4>
        <p className = {style.verified}><span className = {style.span}>Admitido</span>
        <svg width="1.15em" height="1.15em" viewBox="0 0 16 16" className={style.check} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
        </svg>
        </p>
        

        <div className = {style.buttons}>
        <i className={`fas fa-user ${style.actions}`} ></i>
        <i className={`far fa-calendar-alt ${style.actions}`}></i>
        <i className={`fab fa-wpforms ${style.actions}`}></i>
        <i className={`fas fa-envelope ${style.actions}`}></i>
        <i className={`fas fa-plus ${style.actions}`}></i>
        </div>

        {edit ?   
        <div className = {style.edit}>
        <p className = {style.asesorinfo}>Información del contacto</p>
                <form className={style.formContainer}>
                     
                        <div>

                            <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Primer nombre" className={style.input} />
                            <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Apellido" className={style.input} />
                            <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Fecha de Nacimiento: día/mes/año" className={style.input} />
                            <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Celular (sin el N°15)" className={style.input} />
                            <input spellcheck="false" autocomplete="off" type="text" name="email" id="email" placeholder="Correo Electrónico" className={style.input} />
                        </div>
                    
                    <div className = {style.btnContainer}>
                    <button onClick = {() => setEdit(!edit)} className={style.cancelBtn}>Cancelar</button>
                    <button className={style.button} type="submit">Modificar</button>
                    </div>
                </form>
                </div>
                :  
                <div>
        <p className = {style.asesorinfo}>Materias</p>
        <div className = {style.subjectsContainer}>
            {subjects && subjects.map(subject => 
            <p className = {style.subjects}>{subject}</p>
          )}
            {/* <p className = {style.subjects}>Matemáticas</p>
            <p className = {style.subjects}>Lengua y Literatura</p>
            <p className = {style.subjects}>Matemáticas</p>
            <p className = {style.subjects}>Matemáticas</p> */}
        </div>
        </div>
    }
        </div>




        <div className = {style.cards}>
            <div className = {style.filter}>
                <ul className = {style.items}>
                    <li className = {style.item}>Estudiantes</li>
                    <li >Clases</li>
                    <li >Notas</li>
                </ul>
            </div>
            
            <AsesorStudents />
        </div>
    </div>
    </div>
)
}