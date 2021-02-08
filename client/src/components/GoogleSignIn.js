import React from "react";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import {useDispatch} from "react-redux";
import {googleLogin} from "../actions/authActions";
import { withRouter } from 'react-router-dom';
import {useCookies} from "react-cookie";

const GoogleSignIn = (props) => {
  const dispatch = useDispatch()
    
  const responseGoogle = (response) => {
    const userData = response.profileObj;
    dispatch(googleLogin(userData));
  }

  const failureResponse = (response) => {
    console.log(response);
  }

  return (
    <div style={{margin: "20px auto", width: "203px"}}>
      <GoogleLogin 
        clientId="241327774156-fuqsjbfvege5bda7vg0dumrtdfensaqn.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={failureResponse}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  )
}

export default withRouter(GoogleSignIn);