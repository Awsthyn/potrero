import axios from 'axios';
import {GET_STUDENTS, GET_STUDENT_DETAIL, ADD_STUDENT, PUT_STUDENT, ADD_STUDENT_SCHEDULE, EDIT_STUDENT_SCHEDULE, DELETE_STUDENT_SCHEDULE} from '../constants';

export function getStudents() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/students`, {withCredentials: true})
			.then(res => {
				console.log('lalalaalalal',res.data)
				dispatch({type: GET_STUDENTS, payload: res.data});
				return res.data;
			})
			.catch(err => console.log(err));
	};
}

export function getStudentDetail(studentId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/students/${studentId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_STUDENT_DETAIL, payload: res.data})
				return res;
			})
			.catch(err => console.log(err));
	};
}

export function postStudent(student) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/students`, student, {withCredentials: true})
			.then(res => {
				dispatch(mailTutor(res.data))
				.then(() =>
				dispatch({type: ADD_STUDENT, payload: res.data})
				// window.location= "/admin/student"
			)})
			.then(() => window.history.go(-1))
			.catch(err => console.log(err));
	};
}

export function putStudent(student) {
	console.log('put', student)
	return function (dispatch) {
		console.log(student)
		return axios
			.put(`http://localhost:3001/students/${student.id}`, student, {withCredentials: true})
			.then(res => {
				dispatch({type: PUT_STUDENT, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}

export function putStudentIsActive(student) {
	return function (dispatch) {
		console.log(student)
		return axios
			.put(`http://localhost:3001/students/${student.id}/changestatus`, student, {withCredentials: true})
			.then(res => {
				dispatch({type: PUT_STUDENT, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}

export function addSchedule(data) {
	return function (dispatch) {
		dispatch({type: ADD_STUDENT_SCHEDULE, payload: data})

	};
}
export function editSchedule(data) {
	return function (dispatch) {
		dispatch({type: EDIT_STUDENT_SCHEDULE, payload: data})

	};
}
export function deleteSchedule(data) {
	return function (dispatch) {
		dispatch({type: DELETE_STUDENT_SCHEDULE, payload: data})

	};
}

export function mailTutor(data){
	return function(dispatch){
		return axios
			.post(`http://localhost:3001/termsAndConditions/email`, data, {withCredentials: true})
			.then(res => {
				console.log("envio mail",res)
				return res;
			})
			.catch(err =>{
				throw new Error('Error al enviar el mail, verifique los datos ingresados')
			})
	}
}
