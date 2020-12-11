const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const RespuestaSchema = new mongoose.Schema({

    origen: {
        type: ObjectId,
        require: true
    },
    destino: {
        type: ObjectId,
        require: true
    }
});

RespuestaSchema.methods.toJSON = function () {
    const respuesta = this.toObject();
    delete respuesta.__v;
    return respuesta;
};

const RespuestaModel = mongoose.model("respuesta", RespuestaSchema);
module.exports = RespuestaModel;
