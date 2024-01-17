const mongoose = require('mongoose');

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    },
});

module.exports = mongoose.model('Blog', blogSchema)