const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema and model.
const PostSchema = new Schema({
    content: {
        type: String
    },
    date: {
        type: Date
    }
    // location
});

// Create model
const Post = mongoose.model('post', PostSchema);

module.exports = Post;