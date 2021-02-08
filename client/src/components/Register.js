import React, {Component} from "react";
import NavBar from "./NavBar";
import TextField from '@material-ui/core/TextField';
import {Button, Link} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import GoogleSignIn from "./GoogleSignIn";
import axios from "axios";
import {register, loadUser} from "../actions/authActions";
import {useDispatch} from "react-redux";
import {withRouter, Redirect} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import {withCookies, useCookies} from "react-cookie";
import {connect} from "react-redux"
import { compose } from "redux";
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#49334a"
    }
  }
});

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      userName: "",
      password: "",
      isLoading: true
    }
  }

  emailHandler = (e) => {
    this.setState({email: e.target.value});
  }

  userNameHandler = (e) => {
    this.setState({userName: e.target.value});
  }

  passwordHandler = (e) => {
    this.setState({password: e.target.value});
  }

  submit = () => {
    this.props.register(
      this.state.email,
      this.state.userName,
      this.state.password
    )
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (token) {
      setTimeout(() => {
        if (this.props.user) {
          this.props.history.push("/dashboard");
        } else {
          this.props.loadUser(token, userId)
          // wait for the user to be authenticated before the loading is stopped
          if (this.props.isAuthenticated) {
            this.setState({isLoading: false})
          }
        } 
      }, 1000)
    } else {
      this.setState({isLoading: false})
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to="/dashboard" />
      ) 
    } else if (this.state.isLoading){
      return <CircularProgress />
    } else {
      return (
        <div className="register-div">
          <NavBar title="Note Base" />
          <div className="text-inputs">
            <h3 style={{color: "#49334a", marginBottom: "20px"}}>
              Register a free account
            </h3>
            <ThemeProvider theme={theme}>
              <TextField style={{marginBottom: "20px"}} type="email" label="Email" onChange={this.emailHandler} />
              <TextField style={{marginBottom: "20px"}} type="text" label="Username" onChange={this.userNameHandler} />
              <TextField style={{marginBottom: "20px"}} type="password" label="Password" onChange={this.passwordHandler} />
            </ThemeProvider>
              <Button onClick={this.submit} variant="outlined" color="secondary" style={{fontSize: "16px", marginTop: "30px"}}>
                  Register
              </Button>
              <h3 style={{marginTop: "30px", marginBottom: "20px", color: "#49334a"}}>
                Or
              </h3>
              <GoogleSignIn />
              <Link className="login-link" href="/login">
                Already have an account?
              </Link>
          </div>
        </div>
      )
    }
  }
}




const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default compose(
  withRouter,
  connect(mapStateToProps, {register, loadUser})
)(Register);