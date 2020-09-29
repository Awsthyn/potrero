import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { sessionLogin } from "../../redux/actions/session.js";
import { Link, useHistory } from "react-router-dom"
import { getStudents, putStudentIsActive } from '../../redux/actions/student'
import { getSubjects } from '../../redux/actions/subject'


export const StudentCrud = ({ getStudents, getSubjects, putStudentIsActive, students }) => {
  const history = useHistory()
  useEffect(() => {
    getStudents()
    getSubjects()
}, [getStudents, getSubjects])

  return (
    <div className='container' style={{ marginLeft: 250, marginTop: 50, marginBottom: 50, marginRight: 50 }}>
      <h1 className="mt-2 mb-4">Lista de alumnos</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Ver/Asignar clases</th>
            <th>Ver / Editar</th>
            <th>Estado</th>
            <th>Alta/Baja</th>

          </tr>
        </thead>
        <tbody>
          {students.length > 0 && Array.isArray(students) ? students.map(student =>
            <tr key={student.id}>
              <th>{student.id}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td><button className="btn btn-info mt-n3 mb-n3" onClick={()=> history.push(`/admin/estudiantes/listadematerias/${student.id}`)}>Clases</button></td>
              <td><Link
                to={{ pathname: `/admin/estudiantes/detalles/${student.id}`, state: { props: student } }}>
                <button className="btn btn-success mt-n3 mb-n3" >Detalles</button>
              </Link></td>
              {student.isActive ? <td>Activo</td> : <td>Inactivo</td>}
              <td>{student.isActive ? <button className="btn btn-danger mt-n3 mb-n3" onClick={() => putStudentIsActive({ id: student.id, isActive: false }).then(() => alert("El alumno fue dado de baja"))}>Dar de baja</button> :
                <button className="btn btn-success mt-n3 mb-n3" onClick={() => putStudentIsActive({ id: student.id, isActive: true }).then(() => alert("El alumno fue dado de baja"))}>Dar de alta</button>}</td>

            </tr>
          ) : <tr><td className="text-center mt-4">No hay alumnos en la base de datos</td></tr>}
        </tbody>
      </table>
      <button className="mt-4 btn btn-success" onClick={() => history.push('/admin/estudiantes/agregar')}>Agregar alumno</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  sessionUser: state.sessions.sessionUser
})

const mapDispatchToProps = dispatch => {
  return {
    getStudents: () => dispatch(getStudents()),
    getSubjects: () => dispatch(getSubjects()),
    putStudentIsActive: (student) => dispatch(putStudentIsActive(student)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCrud);
