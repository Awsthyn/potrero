import axios from 'axios';
import {GET_USERS, ADD_DATA_SHEET} from '../constants';

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

export function addDataSheet(info){
   return function(dispatch){
		return axios
		.post('http://localhost:3001/datasheet', info, {withCredentials: true})
		.then(res => dispatch({type: ADD_DATA_SHEET, dataSheet: res.data}))
		.catch(err => console.log(err))
   }
}