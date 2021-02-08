
import axios from "axios";

const initialState = {
  currentColor: "white",
  errorMessage: "",
  notes: [], 
  loading: false
}

const NotesReducer = (state = initialState, action) => {
  switch(action.type) {

      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload
        }

      case "CLEAR_NOTES":
        return {
          ...state,
          notes: []
        }

      case "CHANGE_COLOR":
        return {
          ...state,
          currentColor: action.payload
        }
      
      // when all the notes are retrieved, append each one to the notes array
      // state.notes is emptied first to stop duplicate data
      case "ADD_NOTE":
        return {
          ...state,
          notes: [...state.notes, action.payload]
        }

      case "TEMP_STORE":
        return {
          ...state,
          notes: [...state.notes, action.payload]
        }

      default:
        return state
  }
}

export default NotesReducer;