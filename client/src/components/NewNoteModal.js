import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import {useCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {storeNotes} from "../actions/notesActions";
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import NotesBlock from "./NotesBlock";
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import ColorDots from "./ColorDots";
import {setColor, submitNote} from "../actions/notesActions";
import axios from "axios";
import { withCookies, Cookies } from 'react-cookie';
import {connect} from "react-redux";
import {compose} from "redux";


const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#49334a"
    }
  }
});

class NewNoteModal extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      open: false,
      title: "",
      content: "",
      isLoaded: false
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.setColor("white");
  }

  titleHandler = (e) => {
    this.setState({title: e.target.value});
  }

  contentHandler = (e) => {
    this.setState({content: e.target.value});
  }

  submit = () => {
    this.handleClose();
    
    const color = this.props.notes.currentColor;
    const token = localStorage.getItem("token");
    
    // used to check if the user is signed in with google or note
    // if using _id is undefined, then it must change to userId
    let createdBy = this.props.auth.user._id;
    createdBy = createdBy == undefined ? this.props.auth.userId : createdBy;

    

    this.props.submitNote(
      token,
      this.state.title,
      this.state.content,
      createdBy,
      color
    )

    this.setState({isLoaded: true})
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div className="add-button">
            <Button onClick={this.handleOpen} variant="outlined" color="secondary">
              <AddIcon /> New
            </Button> 
          </div>
          <Modal open={this.state.open}> 
            <div>
              <div style={{backgroundColor: this.props.notes.currentColor}} className="new-note-div">
                <div className="new-note-header">
                  <h3>Create a new note</h3>
                </div>
                <div className="new-note-inputs">
                  <TextField onChange={this.titleHandler} className="note-input" style={{marginBottom: "20px"}} label="Title..." variant="outlined" color="secondary" />
                  <TextField onChange={this.contentHandler} className="note-input" label="Notes..." variant="outlined" multiline rows={5} color="secondary" />
                </div>
                <ColorDots />
                <div className="submit-button">
                  <Button onClick={this.submit} variant="outlined" color="secondary">
                  Submit
                  </Button>
                  <Button onClick={this.handleClose} variant="outlined" color="secondary">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </ThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notes: state.notes
})

export default compose(
  withRouter,
  withCookies,
  connect(mapStateToProps, {setColor, submitNote})
)(NewNoteModal);