import React, { useState, useEffect } from 'react';
import style from './AsesorProfile.module.css';
import AsesorStudents from './AsesorStudents/AsesorStudents.jsx';
import AsesorClases from './asesorClases/AsesorClases'
import { connect } from 'react-redux'
import {getUser, putUser} from '../../redux/actions/users'
import axios from "axios";
import AsesorInfo from './AsesorInfo';
import EnviarEmail from './EnviarEmail';

function AsesorProfile ({history, getUser, putUser, user, match}) {
    const [ edit, setEdit ] = useState(false);
    const [ toggle, setToggle ] = useState ({
        students: true,
        classes: false,
        grades: false
    }) 
    const [perfil, setPerfil] = useState(false);
    const [email, setEmail] = useState(false);
    const [clases, setClases] = useState()

    useEffect(() => {
        getUser(match.params.id)
        axios.get(`http://localhost:3001/class/user/${match.params.id}`)
        .then(res => setClases(res.data))
        .catch(err => console.log(err))
    }, [])
    console.log(user)
    console.log(clases)

    function pestañas (e) {
        let defaultToggle = {
            students: false,
            classes: false,
            grades: false
        }
        setToggle({...defaultToggle, [e.target.name] : true})
    }

return(
    <div className = {style.outer}>
    <div className = {style.container}>    
        <div className = {style.profile}>
            <svg viewBox="0 0 16 16" className={style.leftArrow} onClick={()=> history.push('/')} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <img className = {style.photo} src = "https://hackspirit.com/wp-content/uploads/2017/10/male-1.jpg" alt = ""/>
            <h4 className = {style.name}> {`${user.firstName} ${user.lastName}`}
                <svg onClick = {() => {setEdit(!edit); setEmail(false); setPerfil(false)}} width="0.9em" height="0.9em" className = {style.icon} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
            </h4>
            <p className = {style.verified}><span className = {style.span}>Admitido</span>
                <svg width="1.15em" height="1.15em" viewBox="0 0 16 16" className={style.check} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                </svg>
            </p>
            <div className = {style.buttons}>
                <i className={`fas fa-user ${style.actions}`} onClick={() => {setPerfil(!perfil); setEmail(false); setEdit(false)}}></i>
                <i className={`far fa-calendar-alt ${style.actions}`}></i>
                <i className={`fab fa-wpforms ${style.actions}`}></i>
                <i className={`fas fa-envelope ${style.actions}`} onClick={() => {setEmail(!email); setPerfil(false); setEdit(false)} }></i>
                <i className={`fas fa-plus ${style.actions}`}></i>
            </div>
            {edit ? <AsesorInfo putUser={putUser} user={user}/>
                :  
                <div>
                    <p className = {style.asesorinfo}>Materias</p>
                    <div className = {style.subjectsContainer}>
                    {user.subjects?.map(subject => 
                    <p key={subject.id} className = {style.subjects}>{subject.name}</p>
                    )}
                    </div>
                </div>
            }
            {perfil ?  < AsesorInfo user={user} /> : null}
            { email ?  < EnviarEmail user={user}/>  : null }
        </div>
    
        <div className = {style.cards}>
            <div className = {style.filter}>
                <div className = {style.items}>
                    <button onClick = {(e) => pestañas(e)} name = "students" className = {toggle.students ? style.itemOn : style.item} >Estudiantes</button>
                    <button onClick = {(e) => pestañas(e)} name = "classes" className = {toggle.classes ? style.itemOn : style.item} >Clases</button>
                    <button onClick = {(e) => pestañas(e)} name = "grades" className = {toggle.grades ? style.itemOn : style.item}  >Notas</button>
                </div>
            </div>
            {toggle.students ? <AsesorStudents/> : null}
            {toggle.classes ? clases.map(c => <AsesorClases key={c.id} clase={c}/>) : null}
        </div>
    </div>
    </div>
)
}

function mapStateToProps(state){
    return {
        user: state.users.user
    }
}

export default connect(mapStateToProps, {getUser,  putUser})(AsesorProfile)