import React, {Component} from "react";
import CloseIcon from '@material-ui/icons/Close';
import {deleteNote, setColor, editNote} from "../actions/notesActions";
import {connect} from "react-redux";
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import ColorDots from "./ColorDots";
import $ from 'jquery'

class NoteCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      modelOpen: false,
      editData: {},
      title: this.props.data.title,
      content: this.props.data.content
    }
  }

  deleteNote = (id) => {
    $(".note-card-fade").fadeOut(3000);
    const token = localStorage.getItem("token");
    this.props.deleteNote(token, id);
  } 

  editNote = (id) => {
    this.setState({modelOpen: true, editData: this.props.data});
    console.log(id);
    this.props.notes.notes.map(note => {
      if (note._id == id) {
        this.props.setColor(note.color);
      }
    });
  }

  submit = () => {
    console.log("test");
    const {title, content} = this.state;
    const color = this.props.notes.currentColor;
    const createdBy = this.props.user._id;
    const token = localStorage.getItem("token");

    this.props.editNote(token, this.props.data._id, title, content, color);
    this.close();
  }

  close = () => {
    this.setState({modelOpen: false});
    this.props.setColor("white");
  }

  componentDidMount() {
    this.props.setColor(this.props.data.color);
  }

  titleHandler = (e) => {
    this.setState({title: e.target.value});
  }

  contentHandler = (e) => {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <div className="note-card-fade">
        <Fade in={this.state.open}>
          <div style={{backgroundColor: this.props.data.color}} className="note-card">
            <div className="card-header">
              <h3 style={{fontSize: "24px", textDecoration: "underline"}}>{this.props.data.title}</h3>
              <div style={{cursor: "pointer", marginLeft: "auto", marginTop: "4px", marginRight: "4px"}} onClick={() => this.editNote(this.props.data._id)}>
                <EditIcon />
              </div>
              <div style={{cursor: "pointer", marginTop: "4px"}} onClick={() => this.deleteNote(this.props.data._id)}>
                <CloseIcon />
              </div>
            </div>
            <div className="card-body">
              <h5 style={{fontSize: "18px"}}>{this.props.data.content}</h5>
            </div> 
          </div>
        </Fade>
        <Modal open={this.state.modelOpen}>
          <div>
            <div style={{backgroundColor: this.props.notes.currentColor}} className="new-note-div">
              <div className="new-note-header">
                <h3>Create a new note</h3>
              </div>
              <div className="new-note-inputs">
                <TextField onChange={this.titleHandler} className="note-input" style={{marginBottom: "20px"}} label="Title..." variant="outlined" color="secondary" value={this.state.title} />
                <TextField onChange={this.contentHandler} className="note-input" label="Notes..." variant="outlined" multiline rows={5} color="secondary" value={this.state.content} />
              </div>
              <ColorDots />
              <div className="submit-button">
                <Button onClick={this.submit} variant="outlined" color="secondary">
                  Update
                </Button>
                <Button onClick={this.close} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
  notes: state.notes,
  user: state.auth.user
})

export default connect(mapStateToProps, {deleteNote, setColor, editNote})(NoteCard);