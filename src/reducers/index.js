import { combineReducers } from "redux";
import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
  root: dataReducer,
});

export default rootReducer;
