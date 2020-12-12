const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PostSchema = new mongoose.Schema({

    mensaje: {
        type: String,
        require: true
    },
    autor: {
        type: ObjectId,
        require: true
    },
    fechaCreacion: {
        type: Date
    },
    numeroRepost: {
        type: Number,
        default: 0
    },
    numeroLikes: {
        type: Number
    },
    repost: {
        type: ObjectId
    },
    hashtags: {
        type: Array
    },
    menciones: {
        type: Array
    }
});

PostSchema.methods.toJSON = function () {
    const post = this.toObject();
    delete post.__v;
    return post;
};

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
