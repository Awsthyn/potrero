import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getStudentDetail} from '../../redux/actions/student'

export const StudentFile = ({getStudentDetail, studentDetail}) => {

    useEffect(()=>{
    const url = window.location.href
    const ubication = url.lastIndexOf('/')    
        getStudentDetail(url.slice(ubication + 1))
    },[getStudentDetail])

    return (
        <div className="mt-4">
        <h2>{studentDetail.firstName + ' ' + studentDetail.lastName}</h2>
        <table className="table">
        <thead>
            <tr>
                <th>Dato</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>Email</td>
                <td>{studentDetail.email}</td>
            </tr>
            <tr>
                <td>Tutor</td>
                <td>{studentDetail.tutor}</td>
            </tr>
            <tr>
                <td>Teléfono</td>
                <td>{studentDetail.phone}</td>
            </tr>
            <tr>
                <td>Materias</td>
                <td>{studentDetail.subjects ? studentDetail.subjects.map(e => e.name).join(', ') : null}</td>
            </tr>
            <tr>
                <td>Dificultades</td>
                <td>{studentDetail.typeOfDifficulties ? studentDetail.typeOfDifficulties.map(e => e.name).join(', ') : null}</td>
            </tr>
        </tbody>    
        </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    studentDetail: state.students.studentDetail
})

const mapDispatchToProps = dispatch => {
    return {
        getStudentDetail: (id) => dispatch(getStudentDetail(id))
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentFile)
