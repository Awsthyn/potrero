import axios from 'axios';
import {GET_USERS} from '../constants';

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