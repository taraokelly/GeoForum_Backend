const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema and model.
// Post will store the content of the post and the date (both required).
// Post will also embed the GeoJSON to hold the location data - to enable MongoDB's capability to handle geolocation data.
const PostSchema = new Schema({
    lazy_load:{
        type: String
    },
    content: {
        type: String, 
        required: [true,'Content field is required']
    },
    date: {
        type: Date, 
        required: [true,'Content date is required']
    },
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
});

// Create model
const Post = mongoose.model('post', PostSchema, 'post');

module.exports = Post;