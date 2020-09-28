import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CardParent from "./ClassAssignationChild"
import { getMatchingSchedules } from '../../../redux/actions/class';
import { getSubjectDetail } from '../../../redux/actions/subject';
import { getStudentDetail } from '../../../redux/actions/student';




export const ClassAssignation = ({getMatchingSchedules, matchingSchedule, getSubjectDetail, getStudentDetail, subjectDetail, studentDetail, match}) => {
    const {params} = match

    useEffect(() => {
        getSubjectDetail(params.subjectId)
        getStudentDetail(params.studentId)
        getMatchingSchedules(params.studentId, params.subjectId)
    }, [getMatchingSchedules, getStudentDetail, getSubjectDetail])
    
    const onClick = (checked) => {
        //setChecked(checked);
        //onChange(subject, checked);
    }
    return (
        <div style={{marginTop: "100px"}}>
            <h1></h1>
            <h2>Horarios disponibles para asignar una clase de {subjectDetail.name} a {studentDetail.firstName + ' ' + studentDetail.lastName}</h2>
            <div className="d-flex flex-wrap flex-row">
            {matchingSchedule.length > 0 ? 
            matchingSchedule.map((e,i) => <CardParent friendlyData={{subject: subjectDetail.name, name: studentDetail.firstName + ' ' + studentDetail.lastName }} params={params} onClick={onClick} key={i} option={e} id={i} />) 
            : null}
            </div>    
        </div>
    )
}

const mapStateToProps = (state) => ({
    matchingSchedule: state.students.matchingSchedule,
    studentDetail: state.students.studentDetail,
    subjectDetail: state.subjects.subjectDetail
});

const mapDispatchToProps = (dispatch) => {
	return {
        getMatchingSchedules: (studentId, subjectId) => dispatch(getMatchingSchedules(studentId, subjectId)),
        getSubjectDetail: (subjectId) => dispatch(getSubjectDetail(subjectId)),
        getStudentDetail: (studentId) => dispatch(getStudentDetail(studentId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassAssignation)
