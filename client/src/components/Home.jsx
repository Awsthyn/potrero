import {useHistory} from 'react-router-dom'
import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { getStudents } from "../redux/actions/student"

export const Home = ({getStudents}) => {
const history = useHistory()

useEffect(() => {
    getStudents()
}, [getStudents])

    return (
<>
<div className="jumbotron">
  <h1 className="display-4">El Potrero</h1>
  <p className="lead">Apoyo educativo</p>
  <p>Hecho por Henrys</p>
  <hr className="my-4" />
</div>
<button type="button" className="mr-4 btn btn-primary waves-effect btn-rounded" onClick={()=> history.push('/voluntarios/formulario')}><i className="fas fa-rocket" aria-hidden="true"></i>Postularse como voluntario</button>
<button type="button" className="mr-4 btn btn-success waves-effect btn-rounded" onClick={()=> history.push('/usuario/login')}><i className="far fa-user pr-2" aria-hidden="true"></i> Iniciar sesión</button>
{/* <button type="button" className="mr-4 btn btn-warning waves-effect btn-rounded" onClick={()=> history.push('/admin')}><i className="fas fa-cogs pr-2"
        aria-hidden="true"></i>Panel de Admin</button> */}
</>
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
