import {GET_STUDENTS} from '../constants';

const initialState = {
	students:[],
};

export default function studentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_STUDENTS:
			return {
				...state,
				students: action.payload,
			};
		default:
			return state;
	}
}
