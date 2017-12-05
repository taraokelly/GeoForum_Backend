const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema and model.
const PostSchema = new Schema({
    content: {
        type: String, 
        required: [true,'Content field is required']
    },
    date: {
        type: Date
    }
    // location
});

// Create model
const Post = mongoose.model('post', PostSchema, 'post');

module.exports = Post;