'use strict';

const jwt = require('jwt-simple');
const User = require('../models/users.model.js');
const secrets = require('../services/secrets');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secrets.secret);
}

const signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user), role: req.user.role, user_id: req.user._id });
}

const signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  // see if a user with a given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

  // if a user with email exists, return an error
    if (existingUser) {

      return res.status(422).send({ error: 'Email is already in use'});
    }

  // if a user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Respond to request indicating status
    res.json( { token: tokenForUser(user), user_id: user._id });

    });
  });
}

const findUsers = (req, res, next) => {
  User.find(req.query, function(err, response){
    if(err) { return res.status(500).json(err) }
      return res.json(response);
  });
}

const findOneUser = (req, res, next) => {
  User.findById(req.params.user_id, function(err, response) {
    if (err) { return res.status(500).json(err); }

    return res.json(response)
  });
}

module.exports = {
  signin,
  signup,
  findUsers,
  findOneUser,
}