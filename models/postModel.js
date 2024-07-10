const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postData: String,
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    reply: [{
        data: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
});

module.exports = mongoose.model('post',postSchema);