import React from "react";
import {useDispatch} from "react-redux";
import {setColor} from "../actions/notesActions";

const Dot = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div onClick={() => dispatch(setColor(props.color))} style={{backgroundColor: props.color, cursor: "pointer"}} className="dot"></div>
    </>
  )
}

class ColorDots extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: [
        "#cbf0f8",
        "#d7aefb",
        "#aecbfa",
        "#fbbc04",
        "white"
      ]
    }
  }

  render() {
    return (
      <div className="dots">
        {
          this.state.colors.map(color => <Dot key={color} color={color} />)
        }
      </div>
    )
  }
}

export default ColorDots;