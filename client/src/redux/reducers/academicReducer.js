import {GET_ACADEMIC_LEVELS, FILTER_BY_LEVEL} from '../constants';

const initialState = {
	academicLevels:[],
	materias: []
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ACADEMIC_LEVELS:
			console.log(action.payload)
			if(typeof action.payload === 'string'){
				return {
					...state,
					academicLevels: []
				}
			}
			return {
				...state,
				academicLevels: action.payload,
			};
		case FILTER_BY_LEVEL:
			console.log(action.name)
			let materias = state.academicLevels.filter(a => a.name === action.name)[0]?.subjects
			console.log(materias)
			return {
				...state,
				materias: materias
			}
		default:
			return state;
	}
}