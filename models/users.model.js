'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;


// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date }
});

// On save Hook, encrypt password
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // documentDB does some wierd shit. When a user is updated the version number changes
  // if (user.__v >= 0) {
  //  next()
  // }

  // generate a salt, then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // overwrite our unencrypted password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

// Create the model class
const UserModel = mongoose.model('user', userSchema);

// Export the model
module.exports = UserModel;
