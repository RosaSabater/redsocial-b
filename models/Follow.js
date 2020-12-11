const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const FollowSchema = new mongoose.Schema({

    origen: {
        type: ObjectId,
        require: true
    },
    destino: {
        type: ObjectId,
        require: true
    }
});

FollowSchema.methods.toJSON = function () {
    const follow = this.toObject();
    delete follow.__v;
    return follow;
};

const FollowModel = mongoose.model("follow", FollowSchema);
module.exports = FollowModel;
