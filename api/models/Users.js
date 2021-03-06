const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String,
    provider: String,
    isLogin: Boolean,
});

module.exports = mongoose.model('User', userSchema);