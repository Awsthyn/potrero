import { GET_ALL_ASSISTANCE, GET_ASSISTANCE_STUDENT } from "../constants";

const initialState = {
    allAssistances: [],
    assistanceFromStudent: {}
};


export default function statsReducer (state = initialState, action) {
    switch (action.type) {
		case GET_ALL_ASSISTANCE:
			return {
				...state,
				allAssistances: action.payload,
            };
            case GET_ASSISTANCE_STUDENT:
                return {
                    ...state,
                    assistanceFromStudent: action.payload,
                }
                default:
                    return state;
        }
}