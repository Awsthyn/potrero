import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import studentReducer from "./studentReducer";
import subjectReducer from "./subjectReducer"
import sessionReducer from "./sessionReducer";
import userReducer from "./userReducer";
import academicReducer from "./academicReducer";

export default combineReducers({
    volunteers: volunteersReducer,
    students: studentReducer,
    subjects: subjectReducer,
    sessions: sessionReducer,
    users: userReducer,
    academic: academicReducer
});
