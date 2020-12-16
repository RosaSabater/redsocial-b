const UsuarioModel = require('../models/Usuario');
const PostModel = require('../models/Post');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validame} = require("validame");
const { ObjectId } = require('mongodb');

const UsuarioController = {

    async Registro(req, res) {
        try {
            // desestructuro el body
            let { nick, nombreCuenta, email, password, biografia, avatar, pais, ciudad } = req.body;


            // validación de campos
            let error = validame(nick, {req: 2, min: 3, max: 50, allow: "aA 1 _"});
            if (error) {
                return res.status(400).send({ message: "Nick: " + error  });
            };

            error = validame(nombreCuenta, {req: 2, min: 3, max: 30, allow: "aA 1"});
            if (error) {
                return res.status(400).send({ message: "Nombre de cuenta: " +error });
            };

            error = validame(email, {req: 2, min: 3, max: 20, allow: "email"});
            if (error) {
                return res.status(400).send({ message: "Email: " + error });
            };

            error = validame(password, {req: 2, min: 6, allow: "aA 1 ñÑ"});
            if (error) {
                return res.status(400).send({ message: "Contraseña: " +error });
            };

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

            if (!usuarioEncontrado) {
                return res.status(401).send({message: 'Credenciales invalidas.'})
            };

            let passCorrecta = await bcrypt.compare(req.body.password, usuarioEncontrado.password);

            if (!passCorrecta) {
                return res.status(401).send({message: 'Credenciales invalidas.'})
            };

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
            const token = req.headers.authorization;

            await UsuarioModel.findOneAndUpdate({ token: token }, { token: null });

            res.send({ message: 'Sesion finalizada.' });

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'No se ha podido cerrar sesion.' });
        }
    },


    async Delete(req, res) {
        try {
            let usuario = await UsuarioModel.findOneAndDelete({ _id: req.usuario._id });

            if (usuario) {
                await PostModel.deleteMany({ autor: ObjectId(usuario._id) });
            }

            res.send({ message: "Usuario eliminado satisfactoriamente." })

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "No se ha podido eliminar el usuario." })
        }
    },

};

module.exports = UsuarioController;