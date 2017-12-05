const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create geo schema and model.
// Location stored in GeoJSON to enable MongoDB's capability to handle geolocation data.
// http://geojson.org/
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// Create post schema and model.
// Post will store the content of the post and the date (both required).
// Post will also embed the GeoSchema to hold the location data.
const PostSchema = new Schema({
    content: {
        type: String, 
        required: [true,'Content field is required']
    },
    date: {
        type: Date, 
        required: [true,'Content date is required']
    },
    geometry: GeoSchema
});

// Create model
const Post = mongoose.model('post', PostSchema, 'post');

module.exports = Post;