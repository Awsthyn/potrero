import axios from 'axios';
import {POST_VOLUNTARY} from '../constants';

export function postVoluntary(voluntary) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/volunteers`, voluntary, {withCredentials: true})
			.then(res => {
				//dispatch({type: POST_VOLUNTARY, voluntary: res.data});
				dispatch(postMailWelcome(res.data))
			})
			.catch(err => console.log(err));
	};
}

export function postMailWelcome(voluntary){
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/mailWelcomeRejection/mail`, voluntary , {withCredentials : true})
			.then(res =>{
				dispatch({type: POST_VOLUNTARY , voluntary: res.data});
			})
			.catch(err => console.log(err));
	}
}
