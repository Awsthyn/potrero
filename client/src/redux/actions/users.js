import axios from 'axios';
import {GET_USERS} from '../constants';

export function getUsers() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/users`, {withCredentials: true})
			.then(res => {
				const users = res.data.filter(e=> e.state === "aceptado" || e.state === "admin")
				dispatch({type: GET_USERS, payload:users });
				return users;
			})
			.catch(err => console.log(err));
	};
}