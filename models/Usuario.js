const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({

    nick: {
        type: String,
        require: true
    },
    nombreCuenta: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    biografia: {
        type: String
    },
    avatar: {
        type: String
    },
    token: {
        type: String
    },
    pais: {
        type: String
    },
    ciudad: {
        type: String
    },
    fechaCreacion: {
        type: Date
    }
});

UsuarioSchema.methods.toJSON = function () {
    const usuario = this.toObject();
    delete usuario.__v;
    delete usuario.password;
    return usuario;
};


const UsuarioModel = mongoose.model("usuario", UsuarioSchema);
module.exports = UsuarioModel;