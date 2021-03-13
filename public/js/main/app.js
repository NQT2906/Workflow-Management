var app = angular.module('app.works', ['xeditable']);

app.controller('todoController', function($scope, svWorks) {
    $scope.headers = ["To do", "Doing", "Done"];
    $scope.works = [];
    $scope.loading = true;

    svWorks.get().then(function(res) {
        $scope.works = res.data;
        $scope.loading = false;
    }, function(err) {
        if (err) throw err;
    });


    $scope.formData = {};
    $scope.createWork = function() {
        $scope.loading = true;
        if (!$scope.formData.intro) {
            alert("Intro mustn't be empty!!!");
            $scope.loading = false;
        } else {
            var work = {
                intro: $scope.formData.intro,
                content: $scope.formData.content || '',
                link: $scope.formData.link || '',
                status: 0,
                // deadline: $scope.formData.deadline || '',
                // timeRegister: Date.now().format('MM/DD/YYYY'),
            };

            svWorks.create(work).then(function(res) {
                $scope.works = res.data;
                $scope.loading = false;
                $scope.formData.intro = '';
                $scope.formData.link = '';
                $scope.formData.content = '';
                // $scope.formData.deadline = '';
            }, function(err) {
                if (err) throw err;
            });
        }
    };

    $scope.updateWork = function(work) {
        $scope.loading = true;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };


    // Client gửi yêu cầu xóa một todo, svWorks.delete(todo) sẽ gọi đến api delete được định nghĩa trước đó
    $scope.deleteWork = function(work) {
        $scope.loading = true;
        svWorks.delete(work._id).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.next = function(work) {
        $scope.loading = true;
        work.status = work.status + 1;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.back = function(work) {
        $scope.loading = true;
        work.status = work.status - 1;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.getLenSection = function(num) {
        len = 0;
        angular.forEach($scope.works, function(work) {
            if (work.status == num) {
                len = len + 1;
            };
        })
        return len;
    };

    $scope.getStatus = function(work) {
        return $scope.headers[work.status];
    }

    $scope.moveTo = function(work, num) {
        $scope.loading = true;
        work.status = num;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
        $modal.hide();
    };

    $scope.getNowDate = function() {
        var datetime = new Date();
        return (datetime.toISOString().slice(0,10));
    };

    $scope.openModal = function (work) {
        $scope.work = work;
        $modal.open({
            scope: $scope,
        })
    };

});

app.run(['editableOptions', function(editableOptions) {
    editableOptions.theme = 'bs4'; // bootstrap3 theme. Can be also 'bs4', 'bs2', 'default'
  }]);