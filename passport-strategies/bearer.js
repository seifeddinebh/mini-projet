const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy // ?? Strategy
const jwt = require('jsonwebtoken');
const User = require('../Models/user')


passport.use(new BearerStrategy(
    function(token, done) {
      const decoded = jwt.verify(token,'shhhhh')  // decodage du Token
      console.log(decoded);
      User.findOne({ _id: decoded.UserId }, function (err, user) {
        // Verifier l' existance de l ID user dans le token
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' }); // scope : 'all' ?? toucher les API
      });
    }
  ));