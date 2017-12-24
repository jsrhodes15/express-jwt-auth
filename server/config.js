'use strict';

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/express-jwt-auth',
  port: process.env.PORT || 8080
};

module.exports = config;

//  MLAB ======================================================================
// 'mongodb://mercuryMedia:noATsymb0l@ds023432.mlab.com:23432/mercury_new_media'

//  MongoDB.org ===============================================================
// 'mongodb://nch-mongodbuser:moP3ZiW1E4tV94Ca@tulu-shard-00-00-oialo.mongodb.net:27017,tulu-shard-00-01-oialo.mongodb.net:27017,tulu-shard-00-02-oialo.mongodb.net:27017/admin?ssl=true&replicaSet=Tulu-shard-0&authSource=admin'
