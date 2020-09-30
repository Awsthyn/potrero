import axios from 'axios';
import {GET_CLASSES} from '../constants';

export function getClasses() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/class`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_CLASSES, payload: res.data});
				return res.data
			})
			.catch(err => console.log(err));
	};
}

