const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({

    origen: {
        type: String,
        require: true
    },
    destino: {
        type: String,
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
