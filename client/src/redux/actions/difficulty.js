import axios from 'axios';
import {ADD_DIFFICULTY, PUT_DIFFICULTY, GET_DIFFICULTIES, GET_DIFFICULTY_DETAIL,DELETE_DIFFICULTY} from '../constants';

export function getDifficulties() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/typeofdifficulty`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_DIFFICULTIES, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function getDifficultyDetail(difficultyId) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/typeofdifficulty/${difficultyId}`, {withCredentials: true})
			.then(res => {
				dispatch({type: GET_DIFFICULTY_DETAIL, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}

export function postDifficulty(difficulty) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/typeofdifficulty`, difficulty, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_DIFFICULTY, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}

export function putDifficulty(difficulty) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/typeofdifficulty/${difficulty.id}`, difficulty, {withCredentials: true})
			.then(res => {
				console.log(res)
				dispatch({type: PUT_DIFFICULTY, payload: res.data})
			})
			.catch(err => console.log(err));
	};
}