import axios from 'axios';
import {GET_USERS} from '../constants';

export function getUsers() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/users`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_USERS, payload: res.data.filter(e=> e.state === "aceptado" || e.state === "admin")});
			})
			.catch(err => console.log(err));
	};
}