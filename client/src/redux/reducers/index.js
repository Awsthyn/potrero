import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import studentReducer from "./studentReducer"


export default combineReducers({
    volunteers: volunteersReducer,
    students: studentReducer
    });

