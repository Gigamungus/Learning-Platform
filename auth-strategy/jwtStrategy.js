const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secrets = {
  secret: process.env.secret || require("./../config/secrets").secret,
  DBURL: process.env.DBURL || require("./../config/secrets").DBURL
};

const secret = secrets.secret;
const User = require("./../schemas/UserSchema");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = strat = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
