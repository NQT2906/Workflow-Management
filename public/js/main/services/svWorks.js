var app = angular.module('app.works');

app.factory('svWorks', function($http) {
    return {
        get: function() {
            return $http.get('/api/works');
        },
        create: function(data) {
            return $http.post('/api/work', data);
        },
        update: function(data) {
            return $http.put('/api/work', data)
        },
        delete: function(id) {
            return $http.delete('/api/work/' + id)
        }
    };
});