import {GET_CLASSES} from '../constants';

const initialState = {
	classes: []
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CLASSES:	
			return {...state, classes: []}
			return {...state, classes: action.payload}	
		default:
			return state;
	}
}
