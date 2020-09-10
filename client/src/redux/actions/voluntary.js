import axios from 'axios';
import {POST_VOLUNTARY} from '../constants';

//VOLUNTARIOS
export function postVoluntary(voluntary) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/volunteers`, voluntary, {withCredentials: true})
			.then(res => {
				dispatch({type: POST_VOLUNTARY, voluntary: res.data});
			})
			.catch(err => console.log(err));
	};
}
