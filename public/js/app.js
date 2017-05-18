console.log("frontend app app.js");

var app = angular.module('politicalBoard', []);

app.controller('mainController', ['$http', function($http){
    // this.message = "angular works!";
    this.attr_id = "";
    this.posts = [];
    this.viewPost = {}
    this.postComments = [];
    this.viewOnePost = false;
    this.postFormdata = {};
    this.affiliation = ["Hard Right", "Soft Right", "Centrist", "Soft Left", "Hard Left", "Independent"];

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
        for (var i = 0; i < response.data.length; i++) {
            var aff = response.data[i].political_affiliation;

            if(aff == "Hard Right"){
                response.data[i].political_affiliation = "hard-right";
            } else if(aff == "Soft Right"){
                response.data[i].political_affiliation = "soft-right";
            } else if(aff == "Hard Left"){
                response.data[i].political_affiliation = "hard-left";
            } else if(aff == "Soft Left"){
                response.data[i].political_affiliation = "soft-left";
            } else if(aff == "Centrist"){
                response.data[i].political_affiliation = "centrist";
            } else if(aff == "Independent"){
                response.data[i].political_affiliation = "independent";
            };
            console.log(aff);
            console.log(response.data[i].political_affiliation);



        };


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
//create POST route
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
    //carousel
    this.myInterval = 3000;
    this.slides = [
    {
      image: 'http://lorempixel.com/400/200/'
    },
    {
      image: 'http://lorempixel.com/400/200/food'
    },
    {
      image: 'http://lorempixel.com/400/200/sports'
    },
    {
      image: 'http://lorempixel.com/400/200/people'
    }
  ];


}]);
