console.log("frontend app app.js");

var app = angular.module('politicalBoard', []);

app.controller('mainController', ['$http', function($http){
    // this.message = "angular works!";
    this.posts = [];
    this.viewPost = {}
    this.postComments = [];
    this.viewOnePost = false;
    this.postFormdata = {};

    // GET All Posts
    $http({
        method: 'GET',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        url: 'http://localhost:3000/posts'
    }).then(function(response){
        console.log(response.data);
        this.posts = response.data;
    }.bind(this));

    // See one Post and its Comments
    this.showPostComments = function(post_id, ind){
      this.viewPost = this.posts[ind];
      $http({
          method: 'GET',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          url: 'http://localhost:3000/posts/'+post_id
      }).then(function(response){
        console.log(response.data.comments);
        this.postComments = response.data.comments;
        this.viewOnePost = true;
      }.bind(this));

    };
    this.createPost = function(){
        console.log("inside createPost: ", this.postFormdata);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            data: this.postFormdata
        }).then(function(result){
            console.log('Data from server: ', result);
            this.postFormdata = {}
            this.posts.unshift(result.data);
        }.bind(this));
    };



}]);
