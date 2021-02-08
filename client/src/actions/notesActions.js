
import axios from "axios";

export const storeNote = (note) => {
  return {
    type: "ADD_NOTE",
    payload: note
  }
}

export const clearNotes = () => {
  return {
    type: "CLEAR_NOTES"
  }
}

export const getNotes = (token, createdBy) => {
  
  return (dispatch) => {
    dispatch({type: "SET_LOADING", payload: true})

    const config = {
      headers: {
        Authorization: token
      }
    }

    axios
      .get(`http://localhost:8000/api/notes/${createdBy}`, config)
      .then(response => {
        response.data.notes.map(note => {
          dispatch(storeNote(note))
          dispatch({type: "SET_LOADING", payload: false})
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export const submitNote = (token, title, content, createdBy, color) => {

  return (dispatch) => {
    dispatch({type: "SET_LOADING", payload: true});

    const config = {
      headers: {
        Authorization: token
      }
    }

    const body = {
      title, content, createdBy, color
    }

    axios
      .post("http://localhost:8000/api/notes/add", body, config)
      .then((response) => {
        dispatch({type: "SET_LOADING", payload: false})
        dispatch({type: "TEMP_STORE", payload: response.data.note})
        dispatch({type: "CHANGE_COLOR", payload: "White"});
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export const editNote = (token, id, title, content, color) => {
  return (dispatch, getState) => {
    dispatch({type: "SET_LOADING", payload: true})

    const config = {
      headers: {
        Authorization: token
      }
    }

    const body = {
      id, title, content, color 
    }

    axios
      .post("http://localhost:8000/api/notes/update", body, config)
      .then((response) => {
        const {notes} = getState().notes;
        
        // map through the notes and find the corrosponding note to the one being updated
        // then swap the note at the index where it is found with the updated on
        // the match is made using the note id
        notes.map((note, index) => {
          if (note._id === response.data.note._id) {
            notes[index] = response.data.note;
          }
        })

        dispatch({type: "CHANGE_COLOR", payload: "white"});
        dispatch({type: "SET_LOADING", payload: false});
      })
      .catch((err) => console.log(err));
  }
}

export const deleteNote = (token, id) => {
  return (dispatch, getState) => {
    dispatch({type: "SET_LOADING", payload: true});

    const config = {
      headers: {
        Authorization: token
      }
    }

    const body = {
      _id: id
    }

    axios
      .post("http://localhost:8000/api/notes/delete", body, config)
      .then((response) => {
        const {notes} = getState().notes;
        // cleare the deleted note from the redux store 
        // this will remove the note from the dashboard and cause a re-render
        notes.map((note, index) => {
          if (notes[index]._id === response.data._id) {
            notes.splice(index, 1)
          }
        })
        dispatch({type: "SET_LOADING", payload: false});
        dispatch({type: "CHANGE_COLOR", payload: "white"});
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

// action to set the default color of the add note model background
export const setColor = (color) => {
  return {
    type: "CHANGE_COLOR",
    payload: color
  }

}