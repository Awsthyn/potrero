import { GET_USER_SCHEDULE } from '../constants';

const initialState = {
	schedule: {},
};

export default function userScheduleReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_SCHEDULE:
			return {
				...state,
				schedule: action.payload,
			};
		default:
			return state;
	}
}
