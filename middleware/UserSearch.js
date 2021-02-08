
const User = require("../models/User");
const GoogleUser = require("../models/GoogleUser");

function UserSearch(req, res, next) {
  const {createdBy} = req.body;

  User.findOne({_id: createdBy}, (err, user) => {
    if (user) {
     req.id = user._id;
      next();
    } else {
      GoogleUser.findOne({googleId: createdBy}, (err, user) => {
        if (user) {
          req.id = user.googleId
          next();
        }
      })
    } 
  })
}

module.exports = UserSearch;