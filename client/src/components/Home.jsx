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
<button type="button" className="mr-4 btn btn-primary" onClick={()=> history.push('/voluntarios/formulario')}>Postularse como voluntario</button>
<button type="button" className="mr-4 btn btn-primary" onClick={()=> history.push('/usuario/login')}>Iniciar sesión</button>
<button type="button" className="mr-4 btn btn-warning" onClick={()=> history.push('/admin')}>Panel de Admin</button>
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
