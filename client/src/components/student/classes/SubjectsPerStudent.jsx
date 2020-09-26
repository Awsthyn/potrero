import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getStudentDetail} from '../../../redux/actions/student'


export const SubjectsPerStudent = ({getStudentDetail, studentDetail}) => {
    useEffect(() => {
        getStudentDetail(1)
    }, [getStudentDetail])

    return (
        <div>
            <h2>Materias sin clases asignadas</h2>
            {studentDetail.id && studentDetail.subjects && studentDetail.subjects.length > 0 ? studentDetail.subjects.map(s => {
                return (
                <h4>{s.name}</h4>
                )} ) : <h1>No hay datos</h1>}
            <h2>Materias con clases asignadas</h2>
            {studentDetail.id && studentDetail.subjects && studentDetail.subjects.length > 0 ? studentDetail.subjects.filter(s => {
                let assigned = false
                for(let elem of studentDetail.classes){
                    if(elem.subjectId === s.id) assigned = true
                }
                return assigned
            })
            .map(s => {
                return (
                <h4>{s.name}</h4>
                )} ) : <h1>No hay datos</h1>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    studentDetail: state.students.studentDetail
});

const mapDispatchToProps = (dispatch) => {
	return {
        getStudentDetail: (studentId) => dispatch(getStudentDetail(studentId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPerStudent)
