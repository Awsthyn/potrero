import { LOGIN, LOGOUT } from "../constants";

const initialState = {
    sessionUser: {},
    forgottenUser: {},
    productsPurchased: []
};

export default function sessionReducer (state = initialState, action) {
    switch (action.type) {

    case LOGIN:
        console.log(action.payload)
        localStorage.setItem('sessionUser', JSON.stringify(action.payload));
        return {
            ...state,
            sessionUser: action.payload
        }

    case LOGOUT:
        return {
            ...state,
            sessionUser: {}
        }

    /*case GET_FORGOTTEN_USER:
        console.log("GET_FORGOTTEN_USER")
        return {
            ...state,
            forgottenUser: action.payload
        }*/

    default:
        return state
    }
}
