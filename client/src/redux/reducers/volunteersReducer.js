import {ADD_VOLUNTARY} from '../constants';

const initialState = {
	volunteers:[],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_VOLUNTARY:
			return {
				...state,
				volunteers: action.voluntary,
			};
		default:
			return state;
	}
}
