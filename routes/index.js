'use strict';

const express = require('express');
const passport = require('passport');

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');


let router = express.Router();

// API routes

// Authentication Routes
// ==========================================================================
const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdmin = passport.authenticate('admin', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// Basic protected route/page -----------------------------------------------
router.route('/')
  .get(requireAdmin, (req, res) => {
      res.send({message: req.user.email });
  });

// Sign up route
router.route('/signup')
  .post(Authentication.signup);

// Sign in route
router.route('/signin')
  .post(requireSignin, Authentication.signin);

// router.route('/user/:id')
//   .get()

router.route('/users')
  .get(Authentication.findUsers);

router.route('/user/:user_id')
  .get(Authentication.findOneUser);

module.exports = router;
