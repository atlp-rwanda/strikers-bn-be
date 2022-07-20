import {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  CALLBACK_URL,
} from "../config/key";
import passport from "passport";
import facebookPassport from "passport-facebook";
const FacebookStrategy = facebookPassport.Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
