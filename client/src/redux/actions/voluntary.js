import axios from 'axios';
import {ADD_VOLUNTARY, ADD_SCHEDULE} from '../constants';

export function postVoluntary(voluntary) {
	console.log(voluntary)
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/volunteers`, voluntary, {withCredentials: true})
			.then(res => {
				//dispatch({type: ADD_VOLUNTARY, voluntary: res.data});
				dispatch(postMailWelcome(res.data));
			})
			.catch(err => console.log(err));
	};
}
export function addSchedule(schedule) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/volunteers`, schedule, {withCredentials: true})
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
			.catch(err => console.log(err));
	};
}
