const UsuarioModel = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validame} = require("validame");

const UsuarioController = {

    async Registro(req, res) {
        try {
            // desestructuro el body
            let { nick, nombreCuenta, email, password, biografia, avatar, pais, ciudad } = req.body;


            // validación de campos
            if ((validame(nick, {min: 3, max: 50, allow: "aA 1 _"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});

            if ((validame(nombreCuenta, {min: 3, max: 30, allow: "aA 1"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});

            if ((validame(email, {min: 3, max: 20, allow: "email"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});

            if ((validame(password, {min: 6, allow: "aA 1 ñÑ"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});

            if ((validame(biografia, {max: 160, allow: "aA 1 _ ñÑ !"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});

            if ((validame(pais, {max: 30, allow: "aA 1 _ ñÑ !"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});

            if ((validame(ciudad, {max: 30, allow: "aA 1 _ ñÑ !"})) !== "") 
            return res.status(400).send({ message: 'Algo ha fallado.'});


            // encriptación de password
            password = await bcrypt.hash(password, 10);

            await UsuarioModel.create({
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

            res.send({ message: 'Usuario creado satisfactoriamente.' });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo con un email diferente o nombre de cuenta.' })
        }
    },


    async Login(req, res) {

        try {
            let usuarioEncontrado = await UsuarioModel.findOne({ email: req.body.email });

            await bcrypt.compare(req.body.password, usuarioEncontrado.password);

            const token = jwt.sign({
                _id: usuarioEncontrado._id,
                nombreCuenta: usuarioEncontrado.nombreCuenta,
                email: usuarioEncontrado.email,
            }, process.env.secret, { expiresIn: '7d' })

            usuarioEncontrado.token = token;
            await usuarioEncontrado.replaceOne(usuarioEncontrado);

            res.send({
                _id: usuarioEncontrado._id,
                nick: usuarioEncontrado.nick,
                nombreCuenta: usuarioEncontrado.nombreCuenta,
                email: usuarioEncontrado.email,
                biografia: usuarioEncontrado.biografia,
                avatar: usuarioEncontrado.avatar,
                pais: usuarioEncontrado.pais,
                ciudad: usuarioEncontrado.ciudad,
                fechaCreacion: usuarioEncontrado.fechaCreacion,
                token: usuarioEncontrado.token,
            });


        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error.' })
        }

    },


    async Logout(req, res) {
        try {
            await UsuarioModel.findOneAndUpdate({ _id: req.usuario._id }, { token: null });

            res.send({ message: 'Sesion finalizada.' });

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'No se ha podido cerrar sesion.' });
        }
    },


    async Delete(req, res) {
        try {
            await UsuarioModel.findOneAndDelete({ _id: req.usuario._id });

            res.send({ message: "Usuario eliminado satisfactoriamente." })

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "No se ha podido eliminar el usuario." })
        }
    },
};

module.exports = UsuarioController;