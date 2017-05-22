console.log("frontend app app.js");

// window.onload = function(){

    var app = angular.module('politicalBoard', ['ui.bootstrap']);

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

        this.clicked = false;
        this.likeTally = '';

        // GET All Posts
        $http({
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            // url: 'https://typepolitik99.herokuapp.com/posts'
            url: 'http://localhost:3000/posts'
        }).then(function(response){
            this.posts = response.data;
            console.log('get all posts',response.data);
            for (var i = 0; i < response.data.length; i++) {
                var aff = response.data[i].political_affiliation;
                if(aff == "Hard Right"){
                    this.hardRight.push(response.data[i]);
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
            this.viewPost = this.posts[ind];
            this.reset();
            this.showAllPosts = false;
            this.viewOnePost = true;
            $http({
                method: 'GET',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                // url: 'https://typepolitik99.herokuapp.com/posts/'+post_id
                url: 'http://localhost:3000/posts/'+ post_id
            }).then(function(response){
                console.log('showPostComments',response.data);
                this.postComments = response.data.comments;
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
            $http({
                method: 'GET',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                // url: 'https://typepolitik99.herokuapp.com/posts/'+post_id
                url: 'http://localhost:3000/posts/'+post_id
            }).then(function(response){
                console.log('showAffPostComments',response.data.comments);
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
            this.postFormdata.likes = 0;
            console.log(this.postFormData);
            $http({
                method: 'POST',
                // url: 'https://typepolitik99.herokuapp.com/posts',
                url: 'http://localhost:3000/posts',
                data: this.postFormdata
            }).then(function(response){
                console.log('Data from server: ', response);
                this.postFormdata = {}
                var aff = response.data.political_affiliation;
                if(aff == "Hard Right"){
                    response.data.political_affiliation = "hard-right";
                } else if(aff == "Soft Right"){
                    response.data.political_affiliation = "soft-right";
                } else if(aff == "Hard Left"){
                    response.data.political_affiliation = "hard-left";
                } else if(aff == "Soft Left"){
                    response.data.political_affiliation = "soft-left";
                } else if(aff == "Centrist"){
                    response.data.political_affiliation = "centrist";
                } else if(aff == "Independent"){
                    response.data.political_affiliation = "independent";
                };
                this.posts.unshift(response.data);
            }.bind(this));
        };

        this.createComment = function(post_id){
            console.log("inside createComment: ", this.commentFormdata);
            $http({
                method: 'POST',
                // url: 'https://typepolitik99.herokuapp.com/posts/' + post_id + '/comments',
                url: 'http://localhost:3000/posts/' + post_id + '/comments',
                data: this.commentFormdata
            }).then(function(response){
                console.log('Data from server: ', response);
                this.commentFormdata = {};
                var aff = response.data.political_affiliation;
                if(aff == "Hard Right"){
                    response.data.political_affiliation = "hard-right";
                } else if(aff == "Soft Right"){
                    response.data.political_affiliation = "soft-right";
                } else if(aff == "Hard Left"){
                    response.data.political_affiliation = "hard-left";
                } else if(aff == "Soft Left"){
                    response.data.political_affiliation = "soft-left";
                } else if(aff == "Centrist"){
                    response.data.political_affiliation = "centrist";
                } else if(aff == "Independent"){
                    response.data.political_affiliation = "independent";
                };
                this.postComments.push(response.data);
            }.bind(this));
        };

        this.createAffComment = function(post_id){
            console.log(this.viewAffPost.id);
            console.log("inside createAffComment: ", this.commentFormdata);
            $http({
                method: 'POST',
                // url: 'https://typepolitik99.herokuapp.com/posts/' + post_id + '/comments',
                url: 'http://localhost:3000/posts/' + post_id + '/comments',
                data: this.commentFormdata
            }).then(function(response){
                console.log('Data from server: ', response);
                this.commentFormdata = {};
                var aff = response.data.political_affiliation;
                if(aff == "Hard Right"){
                    response.data.political_affiliation = "hard-right";
                } else if(aff == "Soft Right"){
                    response.data.political_affiliation = "soft-right";
                } else if(aff == "Hard Left"){
                    response.data.political_affiliation = "hard-left";
                } else if(aff == "Soft Left"){
                    response.data.political_affiliation = "soft-left";
                } else if(aff == "Centrist"){
                    response.data.political_affiliation = "centrist";
                } else if(aff == "Independent"){
                    response.data.political_affiliation = "independent";
                };
                this.postAffComments.push(response.data);
            }.bind(this));
        };
        //display all
        this.displayHR = function(){
            this.reset();
            this.showAllPosts = false;
            this.hardR = true;
        };
        this.displaySR = function(){
            this.reset();
            this.showAllPosts = false;
            this.softR = true;
        };
        this.displayC = function(){
            this.reset();
            this.showAllPosts = false;
            this.c = true;
        };
        this.displaySL = function(){
            this.reset();
            this.showAllPosts = false;
            this.softL = true;
        };
        this.displayHL = function(){
            this.reset();
            this.showAllPosts = false;
            this.hardL = true;
        };
        this.displayI = function(){
            this.reset();
            this.showAllPosts = false;
            this.i = true;
        };
        //reset page to "home"
        this.reset = function(){
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
            // url: 'https://typepolitik99.herokuapp.com/daily_topics'
            url: 'http://localhost:3000/daily_topics'
        }).then(function(response){
            console.log('daily topic: ', response.data);
            for (var i = 0; i < response.data.length; i++) {
                this.slides.push({
                    text: response.data[i].content,
                    image: 'https://static1.squarespace.com/static/544676fbe4b016fff425e7ea/t/56c4a12b60b5e9e6c63ba9ff/1442345511168/White+Gloss%2FMatte?format=300w',
                    id: currIndex++
                });
            };
        }.bind(this));

//liking system
        this.hRLikeThis = function(ind, id){
            console.log(this.posts[ind].likes);
            console.log(this.posts[ind].hardRightLikes);
            // this.clicked = true;
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/posts/'+ id,
                     // url : herokuURL+'daily_topics/'+tempId,
                data: {
                    likes: (this.posts[ind].likes + 1),
                    hardRightLikes: (this.posts[ind].hardRightLikes + 1)
                }
            }).then(function(response){
                console.log(response.data.likes);
                console.log(response.data.hardRightLikes);
            }.bind(this));
        };
        this.sRLikeThis = function(ind, id){
            console.log(this.posts[ind].likes);
            console.log(this.posts[ind].hardRightLikes);
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/posts/'+ id,
                // url : herokuURL+'daily_topics/'+tempId,
                data: {
                    likes: (this.posts[ind].likes + 1),
                    softRightLikes: (this.posts[ind].softRightLikes + 1)
                }
            }).then(function(response){
                console.log(response.data.likes);
                console.log(response.data.softRightLikes);
            }.bind(this));
        };
        this.cLikeThis = function(ind, id){
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/posts/'+ id,
                // url : herokuURL+'daily_topics/'+tempId,
                data: {
                    likes: (this.posts[ind].likes + 1),
                    centristLikes: (this.posts[ind].centristLikes + 1)
                }
            }).then(function(response){
                console.log(response.data.likes);
                console.log(response.data.centristLikes);
            }.bind(this));
        };
        this.sLLikeThis = function(ind, id){
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/posts/'+ id,
                // url : herokuURL+'daily_topics/'+tempId,
                data: {
                    likes: (this.posts[ind].likes + 1),
                    softLeftLikes: (this.posts[ind].softLeftLikes + 1)
                }
            }).then(function(response){
                console.log(response.data.likes);
                console.log(response.data.softLeftLikes);
            }.bind(this));
        };
        this.hLLikeThis = function(ind, id){
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/posts/'+ id,
                // url : herokuURL+'daily_topics/'+tempId,
                data: {
                    likes: (this.posts[ind].likes + 1),
                    hardLeftLikes: (this.posts[ind].hardLeftLikes + 1)
                }
            }).then(function(response){
                console.log(response.data.likes);
                console.log(response.data.hardLeftLikes);
            }.bind(this));
        };
        this.iLikeThis = function(ind, id){
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/posts/'+ id,
                // url : herokuURL+'daily_topics/'+tempId,
                data: {
                    likes: (this.posts[ind].likes + 1),
                    independentlikes: (this.posts[ind].independentlikes + 1)
                }
            }).then(function(response){
                console.log(response.data.likes);
                console.log(response.data.independentlikes);
            }.bind(this));
        };




            // $http({
            //     method: 'PUT',
            //     url: 'http://localhost:3000/posts/'+ id,
            //     // url : herokuURL+'daily_topics/'+tempId,
            //     data: {
            //         likes: (this.posts[ind].likes + 1),
            //         aff: (column + 1)
            //     }
            // }).then(function(response){
            //     console.log(response.data.likes);
            //     this.likeTally = response.data.likes;
            //     console.log(this.likeTally);
            //
            // }.bind(this));

        // };

        //CHART EXPERIMENTION
        // this.labels = ["Hard Right", "Soft Right", "Centrist", "Soft Left", "Hard Left", "Independent"];
        // this.data = [this.hardRight.length, this.softRight.length, this.centrist.length, this.softLeft.length, this.hardLeft.length, this.independent.length];
        // console.log(this.data);

    }]);

// };
