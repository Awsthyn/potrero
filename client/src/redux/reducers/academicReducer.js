import {GET_ACADEMIC_LEVELS} from '../constants';

const initialState = {
	academicLevels:[],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ACADEMIC_LEVELS:
			console.log(action.payload)
			return {
				...state,
				academicLevels: action.payload,
			};
		
		default:
			return state;
	}
}