const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();
const JWTVerify = require("../middleware/JWTVerify");
const Note = require("../models/Note");
const UpdateMiddleware = require("../middleware/UpdateMiddleware");
const validator = require("validator");
const isEmpty = require("is-empty");

// @POST /api/notes/
// retrieve all notes based on a user ID (createdBy note field)
router.get("/:id", JWTVerify, (req, res) => {
  const userId = req.params["id"];

  Note.find({createdBy: userId}, (err, notes) => {
    res.status(200)
    .json({
      notes
    })
  })
})

// @POST /api/notes/add
// create a new note 
router.post("/add", JWTVerify, (req, res) => {
  let {title, content, createdBy, color} = req.body;

  // give the title field a default value if it is empty
  title = title ? title : "New note";

  const newNote = new Note({
    title, content, createdBy, color
  })

  newNote.save()
  .then((note) => {
    res.status(201)
    .json({
      message: "New note successfully added",
      note
    })
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

// @POST /api/notes/delete
// delete a whole note by id note by id
router.post("/delete", JWTVerify, (req, res) => {
  const {_id} = req.body;
  
  Note.findOneAndDelete({_id}, (err, note) => {
    if (note) {
      res.status(200)
      .json({
        message: `Note ${note._id} successfully deleted`,
        _id: note._id
      })
    } else {
      res.status(400)
      .json({
        message: "Note not found"
      })
    }
  })
})

router.post("/update", JWTVerify, (req, res) => {
  let {id, title, content, color} = req.body;

  title = title.isEmpty ? "" : title;
  content = content.isEmpty ? "" : content;

  if (validator.isEmpty(title)) {
    res.status(400).json({message: "Title field cannot be empty"});
  } else if (validator.isEmpty(content)) {
    res.status(400).jsom({message: "Content field cannot be empty"});
  } else {
    Note.findByIdAndUpdate(id, {title, content, color}, (err, note) => {
      res.status(200).json({
        note: {
          _id: note._id,
          title,
          content, 
          createdBy: note.createdBy,
          color
        }
      })
    })
  }
})

module.exports = router;