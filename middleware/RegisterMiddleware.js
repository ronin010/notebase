const validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/User");

// middleware function to validate the data from the body
// this function will also check to see if any of the information is already in use
function RegisterMiddleware(req, res, next) {
  let {email, userName, password} = req.body;

  // any empty fields are converted to empty strings here
  email = email.isEmpty ? "" : email;
  userName = userName.isEmpty ? "" : userName;
  password = password.isEmpty ? "" : password;

  let errorMessage = "";

  // check if the email field is empty
  // then check if the email is a valid email address
  if (validator.isEmpty(email)) {
    errorMessage = "Email field cannot be empty";
  } else if (!validator.isEmail(email)) {
    errorMessage = "Please enter a valid email address";
  }

  // check if the userName field is empty
  if (validator.isEmpty(userName)) {
    errorMessage = "Username field cannot be empty";
  }

  // check if the password field is empty
  // then validate that the length of the password is correct
  if (validator.isEmpty(password)) {
    errorMessage = "Password field cannot be empty";
  } else if (!validator.isLength(password, {min: 5, max: 24})) {
    errorMessage = "Password must be more than 5 characters and less than 24";
  }

  if (validator.isEmpty(email) && validator.isEmpty(userName) && validator.isEmpty(password)) {
    errorMessage = "Please enter register details";
  }

  // if the errorMessage is not empty then send it to the client
  // else, begin checking to see if any information already exists
  if (errorMessage) {
    res.status(400)
    .json({message: errorMessage})
  } else {
    // attempt to see if the email is already in use
    User.findOne({email}, (err, user) => {
      if (user) {
        res.status(400)
        .json({
          message: "A user with that email already exists"
        })
      } else {
        // check if the userName is already in use
        User.findOne({userName}, (err, user) => {
          if (user) {
            res.status(400)
            .json({
              message: "Username already taken"
            })
          } else {
            // call next if there are no validation or existing data errors
            next()
          }
        })
      }
    })
  }
}

module.exports = RegisterMiddleware;