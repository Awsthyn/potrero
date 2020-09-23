import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import studentReducer from "./studentReducer";
import subjectReducer from "./subjectReducer"
import sessionReducer from "./sessionReducer";
import userReducer from "./userReducer";
import educationLevelReducer from './educationLevelReducer';

export default combineReducers({
    volunteers: volunteersReducer,
    students: studentReducer,
    subjects: subjectReducer,
    sessions: sessionReducer,
    users: userReducer,
    educationLevel: educationLevelReducer
});
