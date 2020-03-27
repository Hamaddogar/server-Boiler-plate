var express = require("express");

const router = express.Router();

var Signup = require("../Model/signup");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");

router.post("/login", (req, res, next) => {
  passport.use(
    new LocalStrategy((username, password, next) => {
      Signup.findOne({ email: username }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false);
        }

        //bcrypt Password Varification
        user.verifyPassword(password, (err, isValid) => {
          if (err) {
            return next(err);
          }
          if (!isValid) {
            return next(null, false);
          }
          next(null, user);
        });
      });
    })
  );

  passport.serializeUser((user, next) => {
    next(null, user.id);
  });
  passport.deserializeUser((id, next) => {
    var user = user.find(user => {
      return user.id === id;
    });
    next(null, user);
  });
  

  passport.authenticate("local", function(err, user) {
    if (user) {
      req.login(user, function() {
        res.json({success: true, data: user});
      });
    } else {
      res.json({success:false, data: user});
    }
  })(req, next);
});
module.exports = router;
