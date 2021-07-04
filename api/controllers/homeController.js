const express  = require('express')
const router   = express.Router();
const passport = require('passport')
const User = require('../models/Users')
const store = require('store')

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    })

    app.get('/success', async (req, res) => {
        // store.set('token', req.user.token);
        res.render('profiles', { user: req.user });
    });

    app.get('/login', function(req, res){
        // User.findOne( {token: store.get('token')}, function(err, user) {
        //     if(user){
        //         user.isLogin = true;
        //         user.save(function(err) {
        //             if(err) 
        //                 throw err;
        //         });
        //             res.render('profiles', { user: user });
        //     } else {
        //         res.redirect('/auth/facebook');
        //     }
        // });
        if(req.user) {
            res.render('profiles', { user: req.user });
        } else {
            res.redirect('/auth/facebook')
        }
    });

    app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
  
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect : '/success', failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/');
    });
  
    app.get('/logout', function(req, res){
        // req.logOut();
        // res.redirect('/');
        req.logout();
        // User.findOne( {token: store.get('token')}, function(err, user) {
        //     if(user) {
        //         user.isLogin = false;
        //         user.save(function(err) {
        //             if(err) 
        //                 throw err;
        //         });
        //     }
        // });
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