import React from "react";
import NoteCard from "./NoteCard";

class NotesBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <>
      {
        this.props.notes.map(note => {
          if (note !== null && typeof note !== "undefined") {
            return (
              <NoteCard key={note._id} color={note.color} title={note.title} content={note.content} />
            )
          }
        })
      }
    </>
  )
  }
  
}

export default NotesBlock;