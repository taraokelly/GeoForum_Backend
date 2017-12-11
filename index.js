// Require modules.
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
// Set up express.js app.
const app = express();
// Connect to MongoDB.
mongoose.connect('mongodb://localhost/forumposts', function(error) {
    if (error) {
        console.err(error);
    } else {
        console.log('Connected');
    }    
});
// Use nodes Promise - mongoose's Promise is depricated.
mongoose.Promise = global.Promise;
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes:

// Root - get
app.get('/', function(req,res){
    // If location is specified - get posts submitted nearby
    if(req.query.lng && req.query.lat){
        var ids = [];
        var d = new Date()
        // https://stackoverflow.com/questions/22080770/i-need-to-create-url-for-get-which-is-going-to-accept-array-how-in-node-js-expr
        if(req.query.id instanceof Array)
            var ids = req.query.id;
        else if(req.query.id)
            var ids = [req.query.id]; //["XHPPSq3Kdy"];
        else 
            var ids = [];
        if(req.query.yr && req.query.m && req.query.d && req.query.hr && req.query.mins && req.query.s)
            var d = new Date(parseInt(req.query.yr), parseInt(req.query.m), parseInt(req.query.d), parseInt(req.query.hr), parseInt(req.query.mins), parseInt(req.query.s))
        // https://docs.mongodb.com/v3.2/reference/command/geoNear/
        // Use Mongo's aggregate function to embed a $nin query to weed out previously seen posts in
        // the geoNear function to get the posts within 100000 metres of the specified location. 

        // To lazy load we are sending the date of the last post that the user has (if there is one),
        // we will minus one milli second and search for anything after that time - using $gte on the date attribute.
        
        // We will also send the id(s) of the post(s) with that have this last time and ignore them - using $nin to ignore the ids already seen with that date
        Post.aggregate([{
            $geoNear: {
                query: { lazy_load: {$nin: ids}, date: { $lte : d }},
                near : {
                    type: "Point",
                    coordinates: [ parseFloat(req.query.lng),  parseFloat(req.query.lat)]
                },
                distanceField: "dis",
                maxDistance: 100000,
                spherical :true
            }, 
        },{ $sort: { date: -1 } }, {$limit : 25}],function(error, posts){
            if (error) return res.send(error);
            else res.send(posts);
        });
    }
    // Else - send all.
    else{
        // Use Mongo's function find will return all the posts in the database
        Post.find(function(error, posts) {
            if (error) return res.send(error);
            else return res.json(posts);
        });
    }
});

// Root - post
app.post('/', function(req,res){
    // https://github.com/ImErvin/Groupd-BackEnd/blob/master/API/apiServer.js#L31
    function generateId(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    function createPost(id){
        Post.find({lazy_load: id}, function(error, result){
            if (error) return response.send(error);
            if(!result.length){
                // Use Mongo's function create a post in the database
                Post.create({
                    content: req.body.content,
                    lazy_load: id,
                    date: new Date(),
                    geometry: {
                        type: "Point", 
                        coordinates: [req.body.geometry.coordinates[0], req.body.geometry.coordinates[1]]
                    }
                }).then(function(post){
                    res.send(post);
                }).catch(function(error){
                    res.status(422).send({error: error.message});
                });
            }else{
                createPost(generateId());
            }
       });
    }
    createPost(generateId());
});

// Listen for requests - use environment port or 4000.
app.listen( process.env.port || 4000, function(){
    console.log('Listening');
});