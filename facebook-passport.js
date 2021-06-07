const { facebook_api_key, facebook_api_secret, callback_url } = require("./config/index");
const passport = require('passport');
const facebookStrategy  = require('passport-facebook').Strategy;
const User = require('./api/models/Users')

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user.token);
});

passport.deserializeUser(function(token, done) {
    User.findOne( {token: token}, function(err, user) {
        done(err, user);
    });
});

// Use the FacebookStrategy within Passport.
passport.use(new facebookStrategy({
    clientID: facebook_api_key,
    clientSecret: facebook_api_secret ,
    callbackURL: callback_url,
    profileFields: ['id', 'displayName', 'name', 'picture.type(large)', 'email']
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'uid' : profile.id }, async function(err, user) {
                // if there is n error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // if the user is found, then log them in
                if (user) {
                    await User.findOne({ 'uid': profile.id }, async function(err, user) {
                        user.token = token;
                        user.isLogin = true;
                        user.save(function(err) {
                            if(err) 
                                throw err;
                            return done(null, user);
                        })
                    })
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.uid    = profile.id; // set the users facebook id                   
                    newUser.token = token; // we will save the token that facebook provides to the user                    
                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.pic = profile.photos[0].value;
                    newUser.provider = profile.provider;
                    newUser.isLogin = true;
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            });
        });
}));
  