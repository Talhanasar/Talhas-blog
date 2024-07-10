const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    image: {
        data: {
            type: Buffer,
            default: ''
        },
        contentType: String
    },
    bgImage:  {
        data: {
            type: Buffer,
            default: ''
        },
        contentType: String
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
});

module.exports = mongoose.model('user',userSchema);