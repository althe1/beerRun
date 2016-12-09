var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
// var path = require("path");

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

app.get('/', function(req,res) {
	res.sendFile('index.html');
});

app.listen(port, function() {
	console.log('Beer Run listening on localhost:'+port);
});
