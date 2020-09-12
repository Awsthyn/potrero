import axios from 'axios';
import {ADD_SUBJECT, EDIT_SUBJECT, DELETE_SUBJECT, GET_SUBJECTS, GET_SUBJECT_DETAIL} from '../constants';

export function getSubjects() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/subjects`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_SUBJECTS, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function getSubjectDetail(subjectId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/subjects/${subjectId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_SUBJECT_DETAIL, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function postSubject(subject) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/subjects`, subject, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_SUBJECT, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}

export function putSubject(subject) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/subjects/${subject.id}`, subject, {withCredentials: true})
			.then(res => {
				
				dispatch({type: EDIT_SUBJECT, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}

export function deleteSubject(subject) {
	return function (dispatch) {
		return axios
			.delete(`http://localhost:3001/subjects/${subject.id}`, subject, {withCredentials: true})
			.then(res => {
				
				dispatch({type: DELETE_SUBJECT, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}