import axios from 'axios';
import {GET_MATCHING_SCHEDULES} from '../constants';

export function getMatchingSchedules(studentId, subjectId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/matching/${studentId}/${subjectId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_MATCHING_SCHEDULES, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}