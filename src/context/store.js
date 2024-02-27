import { createStore } from "redux";
import mineReducers from "./reducers";

const Store = createStore(mineReducers)

export default Store;