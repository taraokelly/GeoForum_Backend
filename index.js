// Require modules.
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
// Set up express.js app.
const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost/forumposts', function(error) {
    if (error) {
        console.err(error);
    } else {
        console.log('Connected');
    }    
});
// Use nodes Promise - mongooses is depricated.
mongoose.Promise = global.Promise;
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send({type:'GET'});
});

app.post('/', function(req,res){
    Post.create({
        content: req.body.content,
        date: new Date()
    }).then(function(post){
        res.send(post);
    }).catch(function(error){
        res.status(422).send({error: error._message});
    });
});

app.put('/:id', function(req,res){
    res.send({type:'PUT'});
});

app.delete('/:id', function(req,res){
    console.log(req.params.id);
    Post.findByIdAndRemove({
        _id: req.params.id
    }).then(function(error, post){
        if (error) return res.send(error);
        else return res.send(post);
    });
});

// Listen for requests - use environment port or 4000.
app.listen( process.env.port || 4000, function(){
    console.log('Listening');
});

app.get('/api/', function(req,res){
    // MongoDb find will return all the users in the database
    Post.find(function(error, posts) {
        if (error) return response.send(error);
        return res.json(posts);
    });
});

// For lazy loading
// https://stackoverflow.com/questions/24689344/lazy-loading-more-data-scroll-in-mongoose-nodejs

// db.test.ensure_index("Age", pymongo.DESCENDING)