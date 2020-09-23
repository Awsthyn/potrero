import axios from 'axios';
import {GET_ACADEMIC_LEVELS, FILTER_BY_LEVEL} from '../constants';

export function getAcademicLevels() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/academiclevel`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_ACADEMIC_LEVELS, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function filterByLevel(name){
	return {
		type: FILTER_BY_LEVEL,
		name
	}
}