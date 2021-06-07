var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');
const facebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieSession = require('cookie-session');
const User = require('./api/models/Users')

var homeController = require('./api/controllers/homeController');
var workController = require('./api/controllers/workController');
var facebookPassport = require('./facebook-passport');
var config = require('./config/index');

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

// require('./facebook-passport')
facebookPassport;

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