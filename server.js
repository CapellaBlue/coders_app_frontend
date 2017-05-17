var express = require('express');
var app     = express();
var port    = 8000;

//dont need routes, but we do need a static folder

app.use(express.static('public'));

app.listen(port, function(){
    console.log("======================");
    console.log("running on port: " + port);
    console.log("======================");
});
