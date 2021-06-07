var configValues = require('./config.json');

module.exports = {
    getDbConnectionString: function() {
        return `mongodb+srv://ThuanNQ:${ configValues.password }@workflow-management.f2rqr.mongodb.net/test`;
        // return `mongodb://localhost:27017/User_Login_FB`;
    },
    "facebook_api_key"      :     "162131665830933",
    "facebook_api_secret"   :     "bd939a16934343c8ebfe35537e3ae237",
    "callback_url"          :     "https://workflow-management-2k.herokuapp.com/auth/facebook/callback",
    // "callback_url"          :     "http://localhost:3000/auth/facebook/callback",
}