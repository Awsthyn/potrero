import {useHistory} from 'react-router-dom'
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import logo from './VolunteerFormAssets/logo.png';
import style from './Home.module.css';
import { getStudents } from "../redux/actions/student"

export const Home = ({getStudents}) => {
const history = useHistory()

useEffect(() => {
    getStudents()
}, [getStudents])

//     return (
// <>
// <div className="jumbotron">
//   <h1 className="display-4">El Potrero</h1>
//   <p className="lead">Apoyo educativo</p>
//   <p>Hecho por Henrys</p>
//   <hr className="my-4" />
// </div>
// <button type="button" className="mr-4 btn btn-primary waves-effect btn-rounded" onClick={()=> history.push('/voluntarios/formulario')}><i className="fas fa-rocket" aria-hidden="true"></i>Postularse como voluntario</button>
// <button type="button" className="mr-4 btn btn-success waves-effect btn-rounded" onClick={()=> history.push('/usuario/login')}><i className="far fa-user pr-2" aria-hidden="true"></i> Iniciar sesión</button>
// {/* <button type="button" className="mr-4 btn btn-warning waves-effect btn-rounded" onClick={()=> history.push('/admin')}><i className="fas fa-cogs pr-2"
//         aria-hidden="true"></i>Panel de Admin</button> */}
// </>
//     )
{/* <button type="button" className = {style.button}
        onClick={()=> history.push('/voluntarios/formulario')}>
        <i className="fas fa-rocket" aria-hidden="true"></i>
        Postularse como voluntario</button>
        <button type="button" className = {style.button}
        onClick={()=> history.push('/usuario/login')}>
        <i className="far fa-user pr-2" aria-hidden="true"></i>
        Iniciar sesión</button> */}

return (
    <div className = {style.container}>
        <img className = {style.logo} src = {logo} alt = "" />
        <div className = {style.btnContainer}>
        <button type="button" className = {style.volunteerBtn}
        onClick={()=> history.push('/voluntarios/formulario')}>
        Quiero ser voluntario</button>
        <button type="button" className = {style.btn}
        onClick={()=> history.push('/usuario/login')}>
        Iniciar sesión
        {/* <span><i className="fas fa-sign-in-alt" style = {{marginLeft: '15px' }} aria-hidden="true"></i></span> */}
        <svg width="1.7em" height="1.7em" viewBox="0 0 16 16" style = {{marginLeft: '30px', marginBottom: '2px'}} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        </button>
        </div>
    </div>
)
}

const mapStateToProps = (state) => ({
    students: state.students.students
})

const mapDispatchToProps = dispatch => {
    return {
    getStudents: () => dispatch(getStudents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
