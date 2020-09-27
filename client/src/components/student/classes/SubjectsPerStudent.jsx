import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getStudentDetail} from '../../../redux/actions/student'
import {getMatchingSchedulesForAllSubjects} from '../../../redux/actions/class'



export const SubjectsPerStudent = ({getStudentDetail, getMatchingSchedulesForAllSubjects, studentDetail, matchingSchedule}) => {
    useEffect(() => {
        getStudentDetail(1)
        getMatchingSchedulesForAllSubjects(1)
    }, [getStudentDetail, getMatchingSchedulesForAllSubjects])
    let possibleClasses = matchingSchedule && matchingSchedule[0] && matchingSchedule.map(e => e[0].user.subjects[0].name)

    return (
        <div>
            <h2>Materias con clases asignadas</h2>
            {studentDetail.id && studentDetail.subjects && studentDetail.subjects.length > 0 ? studentDetail.subjects.filter(s => {
                let assigned = false
                for(let elem of studentDetail.classes){
                    if(elem.subjectId === s.id) assigned = true
                }
                return assigned
            })
            .map((s,i) => {
                return (
                <h4 key={"a"+i}>{s.name}</h4>
                )} ) : <h1>No hay datos</h1>}
            <h2>Materias sin clases asignadas</h2>
            <p>Las materias en color <span style={{color: "#492BC4"}}>lila</span> indican que existe por lo menos un docente con un horario disponible para asignarle una clase a este alumno.</p>
            <p>En caso de querer asignar una clase, haga clic en la <span style={{color: "#492BC4"}}>materia</span> correspondiente.</p>
            {matchingSchedule && matchingSchedule.length > 0  ? matchingSchedule.map((e,i) => {
                return (
                <h4 style={{color: "#492BC4"}} 
                onClick={()=> alert("Te la creíste")}
                subjectid={e[0].user.subjects[0].id} 
                key={"p"+i}>{e[0].user.subjects[0].name}</h4>
                )} ) : null}
            {studentDetail.id && studentDetail.subjects && studentDetail.subjects.length > 0 ? studentDetail.subjects.map((s,i) => {
                if(possibleClasses && possibleClasses.length > 0 && !possibleClasses.includes(s.name)){return (
                    <h4 key={"n"+i}>{s.name}</h4>
                    )}
                } 
                 ) : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    studentDetail: state.students.studentDetail,
    matchingSchedule: state.students.matchingSchedule
});

const mapDispatchToProps = (dispatch) => {
	return {
        getStudentDetail: (studentId) => dispatch(getStudentDetail(studentId)),
        getMatchingSchedulesForAllSubjects: (studentId) => dispatch(getMatchingSchedulesForAllSubjects(studentId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPerStudent)
