import React, {Component} from "react";
import NoteCard from "./NoteCard";
import {connect} from "react-redux";
import {getNotes, clearNotes} from "../actions/notesActions";

class Notes extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.clearNotes();
    const token = localStorage.getItem("token");
    const createdBy = this.props.auth.user._id;      
    this.props.getNotes(token, createdBy);
  }

  render() {
    return (
      <div className="note-div">
        {
          this.props.notes.notes.map(note => (
            <NoteCard key={note._id} data={note} />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  auth: state.auth
})

export default connect(mapStateToProps, {getNotes, clearNotes})(Notes);