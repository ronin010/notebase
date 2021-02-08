import React from "react";
import Avatar from '@material-ui/core/Avatar';
import {logout} from "../../actions/authActions";
import {useDispatch} from "react-redux";
import {Link} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {useCookies} from "react-cookie";

const AuthLinks = (props) => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logoutUser = () => {
    dispatch(logout())
    removeCookie("token");
    props.history.push("/");
  }

  return (
    <>
      <div className="account-header">
        <Avatar src={props.user.imageUrl} />
        <h2 style={{fontSize: "20px", color: "#f50057", marginLeft: "10px", verticalAlign: "middle"}}>{props.user.userName}</h2>
      </div>
      <Link className="nav-link" id="home-link" href="/dashboard">
        Dashboard
      </Link> 
      <Link className="nav-link" id="github-link" href="https://github.com">
        Github Repo
      </Link> 
      <Link className="nav-link" href="/privacy">
        Privacy
      </Link>
      <Link className="nav-link" onClick={logoutUser}>
       Logout
      </Link>
    </>
  )
}

export default withRouter(AuthLinks);