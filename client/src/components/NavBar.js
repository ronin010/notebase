import React, {useState} from "react";
import {AppBar, Toolbar, IconButton, Typography, Button, Drawer, Link} from "@material-ui/core"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Menu} from "@material-ui/icons";
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import {logout} from "../actions/authActions";
import {useDispatch} from "react-redux";
import Redirect from "react-router-dom";
import NavLinks from "./NavLinks/NavLinks";
import AuthLinks from "./NavLinks/AuthLinks";

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleDrawer = () => {
    this.setState({
      isOpen: true
    })
  }

  closeDrawer = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{backgroundColor: "#49334a"}}>
          <Toolbar>
            <IconButton style={{color: "white"}} onClick={this.handleDrawer} edge="start" arial-label="menu" >
              <Menu />
            </IconButton>
            <div style={{flexGrow: 1, marginTop: "5px"}}>
              <Typography variant="h5" style={{textAlign: "center", paddingRight: "40px"}}>
                {this.props.title}
              </Typography>
            </div>
            <div className="account-info">
            {
              this.props.isAuthenticated ? 
              <>
                <h2 className="account-name" style={{fontSize: "20px", color: "#f50057", marginLeft: "10px", verticalAlign: "middle"}}>{this.props.user.userName}</h2>
                <Avatar className="account-img" src={this.props.user.imageUrl} />
              </>
              :
              null
            }
            </div>
          </Toolbar>
        </AppBar>

        <Drawer 
          anchor="left"
          open={this.state.isOpen}
          onClose={this.closeDrawer}
        >
          <div className="drawer-div">
          {
            !this.props.isAuthenticated ? 
            <Link href="/">
              <h2 className="drawer-header"> - Note Base - </h2>
            </Link>
            :
             null 
          }
            <div className="nav-links">
              {this.props.isAuthenticated ? <AuthLinks user={this.props.user} /> : <NavLinks />}
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {})(NavBar);