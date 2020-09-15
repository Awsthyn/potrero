import axios from 'axios';
import {ADD_VOLUNTARY, ADD_SCHEDULE, GET_VOLUNTEERS, DELETE_VOLUNTEER} from '../constants';

export function postVoluntary(voluntary) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/users`, voluntary, {withCredentials: true})
			.then(res => {
				dispatch(postMailWelcome(res.data));
			})
			.catch(err => console.log(err));
	};
}

export function getVolunteers() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/users`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_VOLUNTEERS, volunteers: res.data});
			})
			.catch(err => console.log(err));
	};
}
export function deleteVolunteer(id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/users/${id}`,{disabled:true} ,{withCredentials: true})
			.then(() => {
				dispatch(getVolunteers());
			})
			.catch(err => console.log(err));
	};
}

export function addSchedule(schedule) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/users`, schedule, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_SCHEDULE, schedule: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function postMailWelcome(voluntary) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/mailWelcomeRejection/mail`, voluntary, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_VOLUNTARY, voluntary: res.data});
			})
			.catch(err => console.error('postMailWelcome.catch', err));
	};
}
