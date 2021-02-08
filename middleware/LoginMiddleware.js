const validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/User");

function LoginMiddleware(req, res, next){
  let {userName, password} = req.body;
  let errorMessage = "";

  userName = userName.isEmpty ? "" : userName;
  password = password.isEmpty ? "" : password;

  if (validator.isEmpty(userName)) {
    errorMessage = "Please enter your username";
  }

  if (validator.isEmpty(password)) {
    errorMessage = "Please enter your password";
  }

  if (validator.isEmpty(userName) && validator.isEmpty(password)) {
    errorMessage = "Please enter your login details";
  }

  if (errorMessage) {
    res.status(400)
    .json({
      message: errorMessage
    })
  } else {
    User.findOne({userName}, (err, user) => {
      if (!user) {
        res.status(404)
        .json({
          message: "A user with that name does not exists"
        })
      } else {
        next()
      }
    })
  }
}

module.exports = LoginMiddleware;