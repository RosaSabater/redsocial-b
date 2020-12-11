const UsuarioModel = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UsuarioController = {

    async Registro(req, res) {
        try {
            let {nick, nombreCuenta, email, password, biografia, avatar, pais, ciudad } = req.body;

            const usuario = await UsuarioModel.create({
                nick,
                nombreCuenta,
                email,
                password,
                biografia,
                avatar,
                pais,
                ciudad,
                fechaCreacion: new Date
            });
            res.send({ usuario, message: 'Usuario creado satisfactoriamente.' });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo con un email diferente o nombre de cuenta.', error })
        }
    },





}

module.exports = UsuarioController;