import react, {Component} from "react";
import NavBar from "./NavBar";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";

class PasswordReset extends Component {
  render() {
    return (
      <div>
        <NavBar title="Reset Password" />
        <div className="password-reset">
          <h3 style={{color: "#49334a", marginBottom: "20px", textAlign: "center"}}>Please Enter Your Email Address or Username:</h3>
          <TextField style={{marginBottom: "20px"}} color="secondary" variant="outlined" label="Email or Username" />
          <Button variant="outlined" color="secondary">Submit</Button>
        </div>
      </div>
    )
  }
}

export default PasswordReset;