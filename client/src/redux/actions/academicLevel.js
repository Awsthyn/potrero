import axios from 'axios';
import {GET_ACADEMIC_LEVELS} from '../constants';

export function getAcademicLevels() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/academiclevel`, {withCredentials: true})
			.then(res => {
                console.log(res.data)
				dispatch({type: GET_ACADEMIC_LEVELS, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}