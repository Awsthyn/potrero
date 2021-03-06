import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { sessionLogin } from "../../../redux/actions/session.js";
import {getStudentDetail} from '../../../redux/actions/student'
import {getMatchingSchedulesForAllSubjects, deleteClass} from '../../../redux/actions/class'
import {useHistory} from 'react-router-dom'
import {getUsers} from '../../../redux/actions/users'
import Swal from 'sweetalert2'


export const SubjectsPerStudent = ({getUsers, deleteClass, getStudentDetail, getMatchingSchedulesForAllSubjects, studentDetail, matchingSchedule, users, match}) => {

    const { params }  = match;
    const history = useHistory();

    const onDelete = (classId) => {
        Swal.fire({
            title: 'Borrar clase',
            text: "Este cambio es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar la clase',
            cancelButtonText: `Cancelar`
          }).then((result) => {
            if (result.isConfirmed) {
              deleteClass(classId)
              .then(() =>Swal.fire(
                'Clase eliminada',
                'La clase ha sido borrada',
                'success'
              ))
            }
          })
    }

    useEffect(() => {
        getUsers()
        getStudentDetail(params.studentId)
        getMatchingSchedulesForAllSubjects(params.studentId)
    }, [getStudentDetail, getMatchingSchedulesForAllSubjects, getUsers])
    let assignedSubjects = studentDetail?.classes?.map(e => e.subject)
    let compareAssignedToPosible = assignedSubjects?.map(e => e.name)
    let possibleClasses = matchingSchedule && matchingSchedule[0] && matchingSchedule.map(e => e[0].user.subjects[0].name)
    if(possibleClasses === undefined) possibleClasses = []
    return (
        <div style={{marginTop: "80px"}}>
            <h1>Clases de {studentDetail.firstName + " " + studentDetail.lastName}</h1>
            <h3 className="mt-4 mb-3">Materias con clases asignadas</h3>
            {assignedSubjects && assignedSubjects.length > 0 ? assignedSubjects.map((s,i) => {
                let user = users.length > 0 && users.find(e => e.id === studentDetail.classes[i].userId)
                return (
                <div key={"a"+i} className="d-flex flex-row align-items-center justify-content-between text-left card shadow ml-4 mb-2 pt-2 pl-3" style={{width: "90vw"}}>
                    <h5 style={{width:"20vw"}}>{s.name}</h5>
                    <h5 style={{width:"15vw"}}>{user.firstName + ' ' + user.lastName}</h5>
                    <h5 style={{width:"15vw"}}>{studentDetail.classes[i].nameWeekDay}</h5>
                    <h5 style={{width:"15vw"}}>{studentDetail.classes[i].duration[0].value % 1 === 0 ? String(studentDetail.classes[i].duration[0].value) + ":00" : String(studentDetail.classes[i].duration[0].value).substring(0,2) + ":30"}  {' - '}
                    {studentDetail.classes[i].duration[1].value % 1 === 0 ? String(studentDetail.classes[i].duration[1].value) + ":00" : String(studentDetail.classes[i].duration[1].value).substring(0,2) + ":30"}</h5>
                    <span className="btn btn-danger mt-n2 mr-2" onClick={() => onDelete(studentDetail.classes[i].id) }>Eliminar</span></div>
                )} ) : <h5 className="text-danger">No hay clases asignadas</h5>}
            <h3 className="mt-4">Materias sin clases asignadas</h3>
            <p>Las materias en color <span style={{color: "#492BC4"}}>lila</span> indican que existe por lo menos un docente con un horario disponible para asignarle una clase a este alumno.</p>
            <p className="mt-n3">En caso de querer asignar una clase, haga clic en la <span style={{color: "#492BC4"}}>materia</span> correspondiente.</p>
            {matchingSchedule && matchingSchedule.length > 0  ? matchingSchedule.map((e,i) => {
                if(compareAssignedToPosible && !compareAssignedToPosible.includes(e[0].user.subjects[0].name)){
                return (
                <h5 role="button" className="text-left card shadow ml-4 pl-3 pt-2 pb-2" style={{width: "90vw", color: "#492BC4"}}
                onClick={(e)=> window.location = `/admin/estudiantes/asignacion/${params.studentId}/${e.target.getAttribute("subjectid")}`}
                subjectid={e[0].user.subjects[0].id}
                key={"p"+i}>{e[0].user.subjects[0].name}</h5>
                )}} ) : null}
            {studentDetail.id && studentDetail.subjects && studentDetail.subjects.length > 0 ? studentDetail.subjects.map((s,i) => {
                if(possibleClasses && !possibleClasses.includes(s.name) && !compareAssignedToPosible?.includes(s.name)){return (
                    <h5 className="text-left card shadow ml-4 pl-3 pt-2 pb-2" style={{width: "90vw"}} key={"n"+i}>{s.name}</h5>
                    )}
                }
                 ) : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    studentDetail: state.students.studentDetail,
    matchingSchedule: state.students.matchingSchedule,
    sessionUser: state.sessions.sessionUser,
    users: state.users.users
});

const mapDispatchToProps = (dispatch) => {
	return {
        getStudentDetail: (studentId) => dispatch(getStudentDetail(studentId)),
        getUsers: () => dispatch(getUsers()),
        deleteClass: (classId) => dispatch(deleteClass(classId)),
        getMatchingSchedulesForAllSubjects: (studentId) => dispatch(getMatchingSchedulesForAllSubjects(studentId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPerStudent)
