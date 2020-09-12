import {ADD_DIFFICULTY, PUT_DIFFICULTY, GET_DIFFICULTIES, GET_DIFFICULTY_DETAIL,DELETE_DIFFICULTY} from '../constants';

const initialState = {
	difficulties:[],
	difficultyDetail: {}
};

export default function studentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_DIFFICULTIES:
			return {
				...state,
				difficulties: action.payload,
			};
		case GET_DIFFICULTY_DETAIL:
			return {
				...state,
				difficultyDetail: action.payload
			}	
		case ADD_DIFFICULTY:
			return {
				...state,
                difficulties: state.difficulties.concat(action.payload)
            }
		case PUT_DIFFICULTY:
			return {
				...state,
				difficulties: state.difficulties.map((difficulties) => {
				if(difficulties.id === action.payload.id) {
				  return action.payload
				}
				return difficulties;
			  })
            }
        case DELETE_DIFFICULTY:
            return {
                ...state,
                difficulties: state.difficulties.filter(difficulties => Number(difficulties.id) !== Number(action.payload.id))
            }
		default:
			return state;
	}
}
