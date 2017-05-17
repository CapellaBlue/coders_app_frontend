console.log("frontend app app.js");

var app = angular.module('politicalBoard', []);

app.controller('mainController', ['$http', function($http){
    this.message = "angular works!";
    $http({
        method: 'GET',
        url: 'http://localhost:3000/posts'
    }).then(function(response){
        console.log(response);
    });
}]);
