import axios from 'axios';
import {GET_STUDENTS, GET_STUDENT_DETAIL, ADD_STUDENT, PUT_STUDENT} from '../constants';

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
				dispatch({type: ADD_STUDENT, payload: res.data})
				// window.location= "/admin/student"
			})
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