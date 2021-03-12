var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var homeController = require('./api/controllers/homeController');
var workController = require('./api/controllers/workController');
var config = require('./config/index');

var app = express();
var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

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