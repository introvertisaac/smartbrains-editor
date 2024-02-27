import { combineReducers } from "redux";
import allProjectsReducers from "./allProjectsReducers";
import searchReducer from "./searchReducer";
import userAuthReducer from "./userAuthReducer";

const mineReducers = combineReducers({
    user: userAuthReducer,
    projects:allProjectsReducers,
    searchTerm:searchReducer
})

export default mineReducers;