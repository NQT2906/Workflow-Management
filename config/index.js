var configValues = require('./config.json');

module.exports = {
    getDbConnectionString: function() {
        return `mongodb+srv://{ configValues.username } ${ configValues.password }@workflow-management.f2rqr.mongodb.net/test`;
    }
}