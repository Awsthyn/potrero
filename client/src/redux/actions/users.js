import axios from 'axios';
import {GET_USERS, GET_USER, GET_USER_STUDENTS, GET_USER_CLASS, PUT_USER, ADD_DATA_SHEET} from '../constants';

export function getUsers() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/users`, {withCredentials: true})
			.then(res => {
				if (!(typeof res.data === 'string')) {
						const users = res.data.filter(e=> e.state === "aceptado" || e.state === "admin")
						dispatch({type: GET_USERS, payload:users });
							return users;
				}
				else{
					return false;
				}
			})
			.catch(err => console.log(err));
	};
}

export function banUser(id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/users/${id}`,{isActive:false} ,{withCredentials: true})
			.then((res) => {
				dispatch(getUsers());
				return res
			})
			.catch(err => console.log(err));
	};
}

export function getUser(userId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/users/${userId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_USER, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

// export function getUserStudents() {
// 	return function (dispatch) {
// 		return axios
// 			.get(`http://localhost:3001/users`, {withCredentials: true})
// 			.then(res => {
// 				dispatch({type: GET_USER_STUDENTS, payload: res.data});
// 			})
// 			.catch(err => console.log(err));
// 	};
// }

// export function getUserClass() {
// 	return function (dispatch) {
// 		return axios
// 			.get(`http://localhost:3001/users`, {withCredentials: true})
// 			.then(res => {
// 				dispatch({type: GET_USER_CLASS, payload: res.data});
// 			})
// 			.catch(err => console.log(err));
// 	};
// }

export function putUser(userId, data) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/users/${userId}`, data, {withCredentials: true})
			.then(res => {
				dispatch({type: PUT_USER, payload: res.data})
			})
			.catch(err => console.log(err));
	}
};
export function addDataSheet(info){
   return function(dispatch){
		return axios
		.post('http://localhost:3001/datasheet', info, {withCredentials: true})
		.then(res => dispatch({type: ADD_DATA_SHEET, dataSheet: res.data}))
		.catch(err => console.log(err))
   }
}