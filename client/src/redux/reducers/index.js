import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";


export default combineReducers({
    volunteers: volunteersReducer
    });

