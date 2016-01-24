
    var netpontoApp = angular.module('netpontoApp', []);

    netpontoApp.controller('ItemCtrl', ['$scope', '$http', function ($scope, $http) {
        //   $scope.items = [
        //     {
        //         subItems: [
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 1', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' },
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 2', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' },
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 2', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' }
        //         ]
        //     },
        //     {
        //         subItems: [
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 1', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' },
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 2', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' },
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 2', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' }
        //         ]
        //     },
        //     {
        //         subItems: [
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 1', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' },
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 2', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' },
        //             {url : 'http://placehold.it/700x400', name : 'Project Name 2', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.' }
        //         ]
        //     }
        //   ];

        $http.get('../api/items').success(function (data) {
            $scope.items = data;
        });

    }]);
