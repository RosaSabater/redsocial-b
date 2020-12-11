const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true
    },
    level: {
        type: Number
    }
});

AdminSchema.methods.toJSON = function () {
    const admin = this.toObject();
    delete admin.__v;
    return admin;
};

const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = AdminModel;
