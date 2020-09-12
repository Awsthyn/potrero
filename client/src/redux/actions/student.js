import axios from 'axios';
import {GET_STUDENTS} from '../constants';

export function getStudents() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/students`, {withCredentials: true})
			.then(res => {
				console.log('hi')
				dispatch({type: GET_STUDENTS, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}
