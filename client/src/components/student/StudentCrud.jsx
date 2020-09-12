import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {useHistory} from "react-router-dom"

import {getStudents} from '../../redux/actions/student'

export const StudentCrud = ({getStudents, students}) => {
  const history = useHistory()
    useEffect(()=>{
        getStudents()
        
    },[getStudents])

    return (
        <div>
            <h1 className="mt-2 mb-4">Lista de alumnos</h1>
           <table className="table table-hover">
  <thead>
    <tr>
      <th>#</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Detalles</th>
      <th>Editar</th>
      <th>Dar de baja</th>
    </tr>
  </thead>
  <tbody>
    {students.map(student => 
    <tr key={student.id}>
      <th>{student.id}</th>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td><button className="btn btn-primary mt-n3 mb-n3">Detalles</button></td>
      <td><button className="btn btn-success mt-n3 mb-n3">Editar</button></td>
      <td><button className="btn btn-danger mt-n3 mb-n3">Dar de baja</button></td>
    </tr>
    )}
  </tbody>
</table>
<button className="mt-4 btn btn-success" onClick={() => history.push('/admin/student/post')}>Agregar alumno</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentCrud)
