import React, { useState, useEffect } from 'react';
import style from "./DetalleClase.module.css";
import Datasheet from "./DataSheet";
import axios from 'axios';
import Falto from './Falto';
import Asistio from './Asistio'

export default function DetalleClase({match, history}) {
    const [clase, setClase] = useState()
    const [asistencia, setAsistencia] = useState()

    function handleChange(value){
        setAsistencia(value)
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/class/${match.params.classId}`, {withCredentials: true})
        .then(res => {
            res.data.duration = res.data.duration.map(h => {
                if(h.value < 10 && h.value%1 !== 0){
                    return '0' + (h.value - 0.5 )+ ':30'
                }else if(h.value < 10 && h.value%1 === 0){
                    return '0' + h.value + ':00'
                }else if(h.value >  10 && h.value%1 === 0){
                    return h.value + ':00'
                }else if(h.value > 10 && h.value%1 !== 0){
                    return (h.value - 0.5) + ':30'
                }
            })
            setClase(res.data)
        })
        .catch(error => console.log(error))
    }, [])

    console.log(clase)
    return(
        <div className={style.contenedor}>
            <div className={style.integrantes}>
                <div className={style.circulos}>
                    <button className={style.personas} onClick={() => history.push(`/asesores/${clase.userId}`)}> 
                        <img className = {style.photo} src={`http://localhost:3001/uploads/perfil/${clase?.user.profilePicture}`} alt = ""/>
                    </button>
                    <button className={style.personas}> Alumno </button>    
                </div>
                <p >{clase?.subject.name}</p>
                <p >{clase?.nameWeekDay}</p>
                <p > {clase?.duration[0]} hs - {clase?.duration[1]} hs</p>
                <div className={style.botones}> 
                    <Asistio handleChange={handleChange} /> <Falto handleChange={handleChange} />
                </div>
            </div>
            <Datasheet classId={match.params.classId} assistance={asistencia}/>
        </div>
        
    )
}
