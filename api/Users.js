const express = require("express");
const router = express.Router();
const LoginMiddleware = require("../middleware/LoginMiddleware");
const RegisterMiddleware = require("../middleware/RegisterMiddleware");
const JWTVerify = require("../middleware/JWTVerify");
const UserModel = require("../models/User");
const GoogleUserModel = require("../models/GoogleUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isEmpty = require("is-empty");
const validator = require("validator");
const nodemailer = require('nodemailer');
const {v1: uuidv1} = require("uuid");

// @POST /api/users/
// load a users profile based of the userId in the request body
router.post("/", JWTVerify, (req, res) => {
  const _id = req.body.userId;
  
  User.findOne({_id}, (err, user) => {
    if (user) {
      res.status(200)
      .json({
        user: {
          userId: user._id,
          email: user.email,
          userName: user.userName,
          notes: user.notes
        }
      })
    } else if (!user) {
      GoogleUserModel.findOne({_id}, (err, user) => {
        if (user) {
          res.status(200)
          .json({
            user
          })
        }
      })
    } else {
      res.sendStatus(404)
    }
  })
})

// @ POST /api/users/register
// register a new user with the information provided from the body
router.post("/register", RegisterMiddleware, (req, res) => {
  // aquire request body
  // the data has already been validated within the middleware
  const {email, userName, password} = req.body;

  // define the salt for hashing
  const salt = 8;

  // hash password then create a new user object
  // the new users pasword is set to the generated hash
  bcrypt.hash(password, salt, (err, hash) => {
    
    // new user object
    const newUser = new UserModel({
      email,
      userName,
      password: hash
    })

    // save the user and sign a new token 
    newUser.save()
    .then((user) => {
      jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
        // the new user data and the token is sent to the front end to be stored using redux
        res.status(201)
        .json({
          user: {
            userId: user._id,
            email: user.email,
            userName: user.userName
          },
          token
        })
      })
    })
  })
});

// @POST /api/users/login
// login using standard user credidetials and load the user if the password is correct
router.post("/login", LoginMiddleware, (req, res) => {
  const {userName, password} = req.body;

  UserModel.findOne({userName}, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, success) => {
        if (success) {
          jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
            res.status(200)
            .json({
              token,
              user: {
                userId: user._id,
                email: user.email,
                userName: user.userName
              }
            })
          })
        } else {
          res.status(400)
          .json({
            message: "Incorrect password"
          })
        }
      })
    } else {
      res.status(400)
      .json({
        message: "A user with that username does not exists"
      })
    }
  })
})

// @POST /api/users/google
// continue with or register with a google account
router.post("/google", (req, res) => {
  const {googleId, email, userName, imageUrl} = req.body;

  GoogleUserModel.findOne({googleId}, (err, user) => {
    if (user) {
      jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
        res.status(200)
        .json({
          token,
          user: {
            userId: user._id,
            email: user.email,
            userName: user.userName,
            imageUrl: user.imageUrl
          }
        })
      })
    } else {
      
      const newGoogleUser = new GoogleUserModel({
        googleId, email, userName, imageUrl
      })

      newGoogleUser.save()
      .then((user) => {
        jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
          res.status(201)
          .json({
            token,
            user: {
              userId: user.googleId,
              email: user.email,
              userName: user.userName
            }
          })
        })
      })
    }
  })
})

router.post("/update", JWTVerify, (req, res) => {
  let {userName, email, password, userId, imageUrl} = req.body;

  userName = userName.isEmpty ? "" : userName;
  email = email.isEmpty ? "" : email;
  password = password.isEmpty ? "" : password;

  const fields = [userName, email, password];

  fields.map(field => {
    if (validator.isEmpty(field)) {
      res.status(400).json({message: "Field cannot be empty"});
    } else {
      UserModel.findByIdAndUpdate(userId, {userName, email, password}, (err) => {
        if (err) res.sendStatus(500);
        res.status(200)
        .json({
          user: {
            userId: user._id,
            email: user.email,
            userName: user.userName,
            imageUrl: user.imageUrl
          }
        })
      })
    }
  })
})

module.exports = router;