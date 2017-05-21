console.log("frontend app app.js");

var app = angular.module('politicalBoard', ['ui.bootstrap']);
// var bootUI = angular.module('myModule', ['ui.bootstrap']);

app.controller('mainController', ['$http', function($http){
    // this.message = "angular works!";
    this.attr_id = "";
    this.posts = [];
    this.viewPost = {};
    this.postComments = [];
    this.viewOnePost = false;
    this.showContent = false;
    this.showAllPosts = true;
    this.postFormdata = {};
    this.commentFormdata = {};
    this.affiliation = ["Hard Right", "Soft Right", "Centrist", "Soft Left", "Hard Left", "Independent"];

    // GET All Posts
    $http({
        method: 'GET',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        url: 'https://typepolitik99.herokuapp.com/posts'
    }).then(function(response){

        this.posts = response.data;
        console.log(this.posts[1]);
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
            // console.log(aff);
            // console.log(response.data[i].political_affiliation);
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
          url: 'https://typepolitik99.herokuapp.com/posts/'+post_id
      }).then(function(response){
        //   console.log(response.data.comments);
        this.postComments = response.data.comments;
        this.viewOnePost = true;
        for (var i = 0; i < response.data.comments.length; i++) {
            var aff = response.data.comments[i].political_affiliation;

            if(aff == "Hard Right"){
                response.data.comments[i].political_affiliation = "hard-right";
            } else if(aff == "Soft Right"){
                response.data.comments[i].political_affiliation = "soft-right";
            } else if(aff == "Hard Left"){
                response.data.comments[i].political_affiliation = "hard-left";
            } else if(aff == "Soft Left"){
                response.data.comments[i].political_affiliation = "soft-left";
            } else if(aff == "Centrist"){
                response.data.comments[i].political_affiliation = "centrist";
            } else if(aff == "Independent"){
                response.data.comments[i].political_affiliation = "independent";
            };
            // console.log(aff);
            // console.log(response.data.comments[i].political_affiliation);
        };
      }.bind(this));
    };

//create POST route
    this.createPost = function(){
        // console.log("inside createPost: ", this.postFormdata);
        $http({
            method: 'POST',
            url: 'https://typepolitik99.herokuapp.com/posts',
            data: this.postFormdata
        }).then(function(result){
            // console.log('Data from server: ', result);
            this.postFormdata = {}
            this.posts.unshift(result.data);
            var aff = result.data.comments.political_affiliation;
            if(aff == "Hard Right"){
                response.data.comments.political_affiliation = "hard-right";
            } else if(aff == "Soft Right"){
                response.data.comments.political_affiliation = "soft-right";
            } else if(aff == "Hard Left"){
                response.data.comments.political_affiliation = "hard-left";
            } else if(aff == "Soft Left"){
                response.data.comments.political_affiliation = "soft-left";
            } else if(aff == "Centrist"){
                response.data.comments.political_affiliation = "centrist";
            } else if(aff == "Independent"){
                response.data.comments.political_affiliation = "independent";
            };
        }.bind(this));
    };

    this.createComment = function(post_id){
        console.log("inside createPost: ", this.commentFormdata);
        // this.commentFormdata.post_id = post_id;

        $http({
            method: 'POST',
            url: 'https://typepolitik99.herokuapp.com/posts/' + post_id + '/comments',
            data: this.commentFormdata
        }).then(function(result){
            console.log('Data from server: ', result);
            this.commentFormdata = {}
            this.postComments.unshift(result.data);
        }.bind(this));
    };
//reset page to "home"
    this.reset = function(){
        this.showAllPosts = true;
        this.viewOnePost = false;
        this.showContent = false;
    };
    //===========ACCORDIAN===========//
    this.oneAtATime = true;

    this.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    //=========CAROUSEL===========//
    this.myInterval = 2000;
    this.noWrapSlides = false;
    this.active = 0;
    this.pause = true;
    this.slides = [];
    var currIndex = 0;

    $http({
        method: 'GET',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        url: 'https://typepolitik99.herokuapp.com/daily_topics'
    }).then(function(response){
        console.log('daily topic: ', response.data);
        for (var i = 0; i < response.data.length; i++) {
            this.slides.push({
                text: response.data[i].content,
                image: 'https://static1.squarespace.com/static/544676fbe4b016fff425e7ea/t/56c4a12b60b5e9e6c63ba9ff/1442345511168/White+Gloss%2FMatte?format=300w',
                id: currIndex++
            });
        };
        console.log(this.slides);
    }.bind(this));

//   function generateIndexesArray() {
//     var indexes = [];
//     for (var i = 0; i < currIndex; ++i) {
//       indexes[i] = i;
//     }
//     return shuffle(indexes);
//   }
//
//   function shuffle(array) {
//     var tmp, current, top = array.length;
//
//     if (top) {
//       while (--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = array[current];
//         array[current] = array[top];
//         array[top] = tmp;
//       }
//     }
//
//     return array;
// };

}]);
