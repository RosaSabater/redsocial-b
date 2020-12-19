const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({

    origen: {
        type: String,
        require: true
    },
    destino: {
        type: ObjectId,
        require: true
    }
});

LikeSchema.methods.toJSON = function () {
    const like = this.toObject();
    delete like.__v;
    return like;
};

const LikeModel = mongoose.model("like", LikeSchema);
module.exports = LikeModel;
