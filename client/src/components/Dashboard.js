import React, {Component} from "react";
import {connect} from "react-redux";
import NavBar from "./NavBar";
import {withRouter, Redirect} from "react-router-dom";
import {getNotes, setColor, submitNote, clearNotes} from "../actions/notesActions";
import {compose} from "redux";
import NoteCard from "./NoteCard";
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import ColorDots from "./ColorDots";
import NewNoteModal from "./NewNoteModal";
import Notes from "./Notes";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#49334a"
    }
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props) 
  }
  
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <NavBar title="Note Base" />
          <NewNoteModal />
          <Notes />
        </div>
      )
    } else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notes: state.notes
})

export default compose(
  withRouter,
  connect(mapStateToProps, {getNotes, setColor, submitNote, clearNotes})
)(Dashboard);