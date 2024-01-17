const mongoose = require('mongoose');

const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', usersSchema)