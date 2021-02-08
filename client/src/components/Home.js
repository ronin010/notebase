import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Navbar from "./NavBar";
import {Redirect, withRouter} from "react-router-dom";
import {loadUser} from "../actions/authActions";
import {connect} from "react-redux";
import {compose} from "redux";
import CircularProgress from '@material-ui/core/CircularProgress';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (token) {
      setTimeout(() => {
        this.props.loadUser(token, userId)
        // wait for the user to be authenticated before the loading is stopped
        if (this.props.isAuthenticated) {
          this.setState({isLoading: false})
        }
      }, 1000)
    } else {
      this.setState({isLoading: false})
    }
  }

  loadRegisterPage = () => {
    this.props.history.push("/register");
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
          <Navbar />
          <div className="home-div">
            <h1 style={{color: "white"}}>Note Base</h1>
            <h3 style={{marginTop: "10px", textAlign: "center", width: "80%", color: "white"}}>The easy way to organize your life</h3>
            <Button variant="outlined" color="secondary" onClick={this.loadRegisterPage} style={{fontSize: "16px", marginTop: "20px"}}>
              Try Free Now!
            </Button>
          </div>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default compose(
  withRouter,
  connect(mapStateToProps, {loadUser})
)(Home);