import React, {Component} from "react";
import GoogleSignIn from "./GoogleSignIn";
import TextField from '@material-ui/core/TextField';
import {Button, Link} from "@material-ui/core";
import {login, loadUser} from "../actions/authActions";
import NavBar from "./NavBar";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import {withRouter, Redirect} from "react-router-dom";
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

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      password: "",
      isLoading: true
    }
  }

  userNameHandler = (e) => {
    this.setState({userName: e.target.value});
  }

  passwordHandler = (e) => {
    this.setState({password: e.target.value});
  }

  submit = () => {
    this.props.login(this.state.userName, this.state.password);
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
        <>
        <Fade in={true}>
          <div className="login-div">
            <NavBar title="Note Base" />
            <div className="text-inputs">
              <h3 style={{margin: "20px auto", color: "#49334a", marginBottom: "40px"}}>
                Login with account
              </h3>
              <ThemeProvider theme={theme}>
                <TextField style={{marginBottom: "20px"}} onChange={this.userNameHandler} label="Username" variant="outlined" />
                <TextField type="password" onChange={this.passwordHandler} label="Password" variant="outlined" />
              </ThemeProvider>
              <Link href="/password-reset">
                <h3 href="/password-reset" style={{textAlign: "center", color: "#49334a", marginTop: "20px", cursor: "pointer"}}>forgot password?</h3>
              </Link>
              
              <Button variant="outlined" color="secondary" onClick={this.submit} style={{fontSize: "16px", marginTop: "40px"}}>
                  Login
              </Button>
              <h3 style={{marginTop: "20px", color: "#49334a"}}>
                Or
              </h3>
              <GoogleSignIn />
              <Link className="register-link" href="/register">
              Need an account?
            </Link>
            </div> 
          </div>
          </Fade>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default compose(
  withRouter,
  connect(mapStateToProps, {login, loadUser})
)(Login);