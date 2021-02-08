const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  color: {
    type: String,
    required: true
  }
})

const Note = module.exports = mongoose.model("notes", noteSchema);