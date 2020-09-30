import axios from 'axios';
import {GET_MATCHING_SCHEDULES, DELETE_CLASS_FROM_STUDENT} from '../constants';

export function getMatchingSchedulesForAllSubjects(studentId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/matching/${studentId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_MATCHING_SCHEDULES, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}



export function getMatchingSchedules(studentId, subjectId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/matching/${studentId}/${subjectId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_MATCHING_SCHEDULES, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function postClass(clase){
		return axios
			.post(`http://localhost:3001/class`, clase, {withCredentials: true})
			.then(() => window.location = `/admin/estudiantes/asignacion/${clase.studentId}`)
}

export function deleteClass(classId){
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3001/class/${classId}`, {withCredentials: true})
			.then(() => dispatch({type: DELETE_CLASS_FROM_STUDENT, payload: classId}))
			.catch(err => console.log(err));
	}
}