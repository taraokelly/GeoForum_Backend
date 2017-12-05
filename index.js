// Require modules.
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
// Set up express.js app.
const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost/forumposts');
// Use nodes Promise - mongooses is depricated.
mongoose.Promise = global.Promise;
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req,res){
    console.log('Name :'+req.body.name);
    res.send({type:'GET'});
});

app.post('/', function(req,res){
    Post.create({
        content: req.body.content,
        date: new Date()
    }).then(function(post){
        res.send(post);
    });
});

app.put('/:id', function(req,res){
    res.send({type:'PUT'});
});

app.delete('/:id', function(req,res){
    res.send({type:'DELETE'});
});

// Listen for requests - use environment port or 4000.
app.listen( process.env.port || 4000, function(){
    console.log('Listening');
});

// For lazy loading
// https://stackoverflow.com/questions/24689344/lazy-loading-more-data-scroll-in-mongoose-nodejs

// db.test.ensure_index("Age", pymongo.DESCENDING)