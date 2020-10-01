import React, { useState, useEffect } from 'react';
import style from "./DetalleClase.module.css";
import Datasheet from "./DataSheet";
import axios from 'axios';
import Falto from './Falto';
import Asistio from './Asistio'
import profilePic from '../assets/avatarPerfil.jpeg'

export default function DetalleClase({match, history}) {
    const [clase, setClase] = useState()
    const [asistencia, setAsistencia] = useState() 
    const [fotoPerfil, setFotoPerfil] = useState()

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
            if(res.data.user.profilePicture && res.data.user.profilePicture === 'tampoco' )
                setFotoPerfil(profilePic)
                else{
                    setFotoPerfil(`http://localhost:3001/uploads/perfil/${res.data.user.profilePicture} `)
                }
            setClase(res.data)
        })
        .catch(error => console.log(error))
        
    }, [])

    console.log(clase)

    return(
        <div className={style.contenedor}>
            <div className={style.integrantes}>
                <div className={style.circulos}>
                    <div style={{outline: 'none'}} className={style.personas} 
                    onClick={() => history.push(`/asesores/${clase.userId}`)}> 
                    <div className = {style.imgContainer}>
                    <p> Asesor </p> 
                        <img className = {style.photo} src={fotoPerfil} alt = ""/>
                        <div className={style.overlay}>
                            <div className= {style.text}>{clase?.user.firstName} {clase?.user.lastName}</div>
                        </div>
                        </div>
                    </div>
                    <div className= {style.lineGray}></div>

                    <div style={{outline: 'none'}} className={style.personas}
                    onClick={() => history.push(`/admin/estudiantes/detalles/${clase.student.id}`)}>
                        <div className = {style.imgContainer}>
                        <span className={style.alinear} >  
                            <p> Alumno </p> 
                            <img className = {style.photo} src={`https://api.adorable.io/avatars/285/${clase?.student.firstName}@adorable.png`} alt = ""/>
                        </span>
                        <div className={style.overlay}>
                            <div className= {style.text}>{clase?.student.firstName} {clase?.student.lastName}</div>
                        </div>
                        </div> 
                        </div>    
                </div>
                <p style = {{color: '#333333'}}>Materia: <strong>{clase?.subject.name}</strong></p>
                <p style = {{color: '#333333'}}>Fecha y horario: <strong>{clase?.nameWeekDay}  {clase?.duration[0]} hs - {clase?.duration[1]} hs</strong></p>
                <div className={style.botones} style = {{marginTop: '3%'}}> 
                    <Asistio handleChange={handleChange} /> <Falto handleChange={handleChange} />
                </div>
            </div>
            <Datasheet classId={match.params.classId} assistance={asistencia}/>
        </div>
        
    )
}
