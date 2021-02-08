
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  errorMessage: ""
}

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {

    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      }

    case "LOGIN_SUCCESS":  
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }

    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        errorMsg: action.errorMsg
      }

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      }
    
      case "SET_ERRORS":
        return {
          ...state,
          errorMessage: action.payload
        }
      
    default:
      return state;
  }
}

export default AuthReducer;