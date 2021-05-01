const express  = require('express')
const router   = express.Router();
const passport = require('passport')

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    })

    app.get('/login', isLoggedIn, function(req, res){
        res.render('profiles' , { user: req.user });
    });

    app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
  
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect : '/login', failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/');
    });
  
    app.get('/logout', function(req, res){
        req.logOut();
        res.redirect('/');
    });
  
}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}