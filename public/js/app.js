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
    //display all of one type of affiliation
    this.hardRight = [];
    this.softRight = [];
    this.centrist = [];
    this.softLeft = [];
    this.hardLeft = [];
    this.independent = [];
    this.hardR = false;
    this.softR = false;
    this.c = false;
    this.softL = false;
    this.hardL = false;
    this.i = false;
    //affiliation join discussion
    this.viewAffPost = {};
    this.postAffComments = [];
    this.viewOneAffPost = false;

    // GET All Posts
    $http({
        method: 'GET',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        url: 'https://typepolitik99.herokuapp.com/posts'
    }).then(function(response){
        this.posts = response.data;
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            var aff = response.data[i].political_affiliation;

            if(aff == "Hard Right"){
                this.hardRight.push(response.data[i]);
                console.log(this.hardRight);
                response.data[i].political_affiliation = "hard-right";
            } else if(aff == "Soft Right"){
                this.softRight.push(response.data[i]);
                response.data[i].political_affiliation = "soft-right";
            } else if(aff == "Hard Left"){
                this.hardLeft.push(response.data[i]);
                response.data[i].political_affiliation = "hard-left";
            } else if(aff == "Soft Left"){
                this.softLeft.push(response.data[i]);
                response.data[i].political_affiliation = "soft-left";
            } else if(aff == "Centrist"){
                this.centrist.push(response.data[i]);
                response.data[i].political_affiliation = "centrist";
            } else if(aff == "Independent"){
                this.independent.push(response.data[i]);
                response.data[i].political_affiliation = "independent";
            };
        };
    }.bind(this));

    // See one Post and its Comments
    this.showPostComments = function(post_id, ind, aff){
        console.log(post_id);
        console.log(ind);
        console.log(aff);
      this.viewPost = this.posts[ind];

      this.showAllPosts = false;
      this.hardR = false;
      this.softR = false;
      this.c = false;
      this.softL = false;
      this.hardL = false;
      this.i = false;
      $http({
          method: 'GET',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          url: 'https://typepolitik99.herokuapp.com/posts/'+post_id
      }).then(function(response){
          console.log(response.data);
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
        };
      }.bind(this));
    };


    this.showAffPostComments = function(post_id, ind, aff){
        console.log(post_id);
        console.log(ind);
        console.log(aff);
        this.reset();
        this.showAllPosts = false;
        this.viewOneAffPost = true;
        if(aff == "hard-right"){
            this.viewAffPost = this.hardRight[ind];
            console.log(this.viewAffPost);
        } else if(aff == "soft-right"){
            this.viewAffPost = this.softRight[ind];
        } else if(aff == "hard-left"){
            this.viewAffPost = this.hardLeft[ind];
        } else if(aff == "soft-left"){
            this.viewAffPost = this.softLeft[ind];
        } else if(aff == "centrist"){
            this.viewAffPost = this.centrist[ind];
        } else if(aff == "independent"){
            this.viewAffPost = this.independent[ind];
        };
        // this.viewAffPost = this.posts[ind];
        console.log(this.viewAffPost);
    //   this.viewAffPost = this.posts[ind];
      $http({
          method: 'GET',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          url: 'https://typepolitik99.herokuapp.com/posts/'+post_id
      }).then(function(response){
          console.log(response.data.comments);
        this.postAffComments = response.data.comments;
        this.viewOneAffPost = true;

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
    //display all
    this.displayHR = function(){
        this.reset();
        this.showAllPosts = false;
        this.hardR = true;
    };
    this.displaySR = function(){
        console.log("clicked");
        this.reset();
        this.showAllPosts = false;
        this.softR = true;
    };
    this.displayC = function(){
        console.log("clicked");
        this.reset();
        this.showAllPosts = false;
        this.c = true;
    };
    this.displaySL = function(){
        console.log("clicked");
        this.reset();
        this.showAllPosts = false;
        this.softL = true;
    };
    this.displayHL = function(){
        console.log("clicked");
        this.reset();
        this.showAllPosts = false;
        this.hardL = true;
    };
    this.displayI = function(){
        console.log("clicked");
        this.reset();
        this.showAllPosts = false;
        this.i = true;
        // this.hardR = false;
        // this.softR = false;
        // this.c = false;
        // this.softL = false;
        // this.hardL = false;
        // this.i = true;
        // this.showAllPosts = false;
        // this.viewOnePost = false;
        // this.showContent = false;
    };
//reset page to "home"
    this.reset = function(){
        console.log("clicked");
        this.showAllPosts = true;
        this.viewOnePost = false;
        this.showContent = false;
        this.hardR = false;
        this.softR = false;
        this.c = false;
        this.softL = false;
        this.hardL = false;
        this.i = false;
        this.viewOneAffPost = false;
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

}]);
