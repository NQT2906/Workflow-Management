var configValues = require('./config.json');

module.exports = {
    getDbConnectionString: function() {
        // return `mongodb+srv://ThuanNQ:${ configValues.password }@workflow-management.f2rqr.mongodb.net/test`;
        return `mongodb://localhost:27017/User_Login_FB`;
    }
}