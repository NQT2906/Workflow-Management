var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var work = new Schema({
    intro: String,
    link: String,
    status: Number,
    content: String,
    deadline: Date,
    timeRegister: Date
})

var Works = mongoose.model('Works', work);

module.exports = Works; 