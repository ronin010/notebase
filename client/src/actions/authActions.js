
import { ErrorRounded } from "@material-ui/icons";
import axios from "axios";

// load a user from a JWT being decoded server side
export const loadUser = (token, userId) => {
  return (dispatch) => {
    dispatch({type: "SET_LOADING", payload: true});

    const config = {
      headers: {
        authorization: token
      }
    }

    const body = {
      userId
    }

    axios
    .post("http://localhost:8000/api/users/", body, config)
    .then((response) => {
      dispatch({type: "LOAD_USER", payload: response.data.user})
      dispatch({type: "SET_LOADING", payload: false})
    })
    .catch((err) => {
      console.log(err)
    })
  } 
}

export const login = (userName, password) => {
  return (dispatch) => {
    dispatch({type: "SET_LOADING", payload: true});
    const body = {
      userName, password
    }

    axios.post("http://localhost:8000/api/users/login", body)
    .then((response) => {
      const token = response.data.token.toString();
      const userId = response.data.user.userId.toString();
      localStorage.setItem("token", response.data.token.toString())
      localStorage.setItem("userId", userId);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.user
      })
      dispatch({type: "SET_LOADING", payload: false});
    })
    .catch((err) => {
      const errorMsg = err.response.data.message;
      console.log(errorMsg);
    })
  }
}

export const register = (email, userName, password) => {
  return (dispatch) => {
    dispatch({type: "SET_LOADING", payload: true});

    const body = {
      email, userName, password
    }

    axios.post("http://localhost:8000/api/users/register", body)
    .then((response) => {
      const token = response.data.token.toString();
      const userId = response.data.user.userId.toString();
      localStorage.setItem("token", response.data.token.toString())
      localStorage.setItem("userId", userId);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data.user
      })
      dispatch({type: "SET_LOADING", payload: false});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export const googleLogin = (userData) => {
  return (dispatch) => {
    dispatch({type: "SET_LOADING", payload: true})

    const body = {
      googleId: userData.googleId,
      email: userData.email,
      userName: userData.givenName,
      imageUrl: userData.imageUrl
    }

    axios.post("http://localhost:8000/api/users/google", body)
    .then((response) => {
      const token = response.data.token.toString();
      const userId = response.data.user.userId.toString();
      localStorage.setItem("token", response.data.token.toString())
      localStorage.setItem("userId", userId);
      dispatch({
        type: "LOGIN_SUCCESS", 
        payload: response.data.user
      })
      dispatch({type: "SET_LOADING", payload: false})
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export const updateUser = (userName, email) => {

}

export const logout = () => {
  return {
    type: "LOGOUT"
  }
}



