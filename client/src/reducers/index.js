  
import AuthReducer from "./AuthReducer";
import NotesReducer from "./NotesReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  auth: AuthReducer,
  notes: NotesReducer
})

export default rootReducer;