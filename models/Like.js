const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const LikeSchema = new mongoose.Schema({

    origen: {
        type: ObjectId,
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
