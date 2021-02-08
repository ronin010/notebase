const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
})

const GoogleUser = module.exports = mongoose.model("google_users", googleUserSchema);