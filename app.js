var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');
const facebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieSession = require('cookie-session');
const User = require('./api/models/Users');

var homeController = require('./api/controllers/homeController');
var workController = require('./api/controllers/workController');
var config = require('./config/index');
const config1 = require('./config');

var app = express();
var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
// Passport session setup.
passport.serializeUser(function(id, done) {
    console.log('serializeUser________________________________________');
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser________________________________________');
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Use the FacebookStrategy within Passport.
passport.use(new facebookStrategy({
    clientID: config1.facebook_api_key,
    clientSecret:config1.facebook_api_secret ,
    callbackURL: config1.callback_url,
    profileFields: ['id', 'displayName', 'name', 'picture.type(large)', 'email']
},
function(token, refreshToken, profile, done) {

    // asynchronous
    // console.log(profile);
    process.nextTick(function() {
        console.log('Next_tick________________________________________');

        // find the user in the database based on their facebook id
        User.findOne({ 'uid' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user._id); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser            = new User();

                // set all of the facebook information in our user model
                newUser.uid    = profile.id; // set the users facebook id                   
                newUser.token = token; // we will save the token that facebook provides to the user                    
                newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                newUser.pic = profile.photos[0].value
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, newUser._id);
                });
            }

        });

    })
}));

mongoose.connect(config.getDbConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
});

homeController(app);
workController(app);


app.listen(port, function(){
    console.log('Server is listening at port:', port);
})