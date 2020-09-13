import {ADD_VOLUNTARY, ADD_SCHEDULE} from '../constants';

const initialState = {
	volunteers: [],
	schedule: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_VOLUNTARY:
			return {
				...state,
				volunteers: [...state.volunteers, action.voluntary],
			};
		case ADD_SCHEDULE:
			return {
				...state,
				schedule: [...state.schedule, action.schedule],
			};
		default:
			return state;
	}
}
