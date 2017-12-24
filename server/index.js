'use strict';

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const router = require('../routes');
const config = require('./config');

// Initialize Express app
const app = express();

app.use(helmet());

// Allow cross origin resource sharing
app.use(cors());
// log every request to the console
app.use(morgan('dev'));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
// parse application/json
app.use(bodyParser.json({type: '*/*' }));
// lets us use HTTP verbs where otherwise unable
app.use(methodOverride());

// MONGOOSE AND MONGODB CONNECTION --------------------------------------------
mongoose.connect(config.mongoURL, { useMongoClient: true }, (err) => {
  if (err) {
    console.log('Mongoose connection error:');
    throw err;
  }
  console.log('Connection open to ' + config.mongoURL);
});

process.on('SIGINT', () => {
  mongoose.connection.close( () => {
    console.log('Mongoose connection disconnected through app termination.');
    process.exit(0);
  });
});

// IMPORT AND REGISTER OUR ROUTES ---------------------------------------------
app.use('/api', router);

// Express application will listed to port mentioned in our application
app.listen(config.port, (err) => {
  if (err) throw err;
  console.log('The magic is happening on port: ' + config.port);
});
