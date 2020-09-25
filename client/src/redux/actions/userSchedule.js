import axios from 'axios';
import { GET_USER_SCHEDULE } from '../constants';

// Trae todos los horarios de un voluntario
export function getUserSchedule(id) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/userSchedule/${id}`, {withCredentials: true})
			.then(res => {
                console.log('ssssssssss', res.data)
				dispatch({type: GET_USER_SCHEDULE, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}