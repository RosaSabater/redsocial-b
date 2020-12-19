const PostModel = require('../models/Post');
const { validame } = require('validame');
const { ObjectId } = require('mongodb');
const UsuarioModel = require('../models/Usuario');

const PostController = {

    // postear
    async Post(req, res) {
        try {
            let { mensaje } = req.body;

            let error = validame(mensaje, { req: 2, min: 1, max: 280, allow: "aA 1 2 _ ñÑ !" });
            if (error) {
                return res.status(400).send({ message: "Post: " + error });
            };

            if (!req.usuario) {
                return res.status(401).send({ message: "Ha ocurrido un error." })
            }

            let postCreado = await PostModel.create({
                mensaje,
                autor: ObjectId(req.usuario._id),
                fechaCreacion: new Date,
                numeroRepost: 0,
                numeroLikes: 0,
                repost: null,
                hashtags: [],
                menciones: []
            });


            res.send({ message: 'Post publicado correctamente.', objetoPost: postCreado });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo más tarde.' })
        }
    },


    // ver todos los post
    async getPosts(req, res) {

        try {
            let { nombreCuentaAutor } = req.body;

            let resAggregate;

            if (nombreCuentaAutor) {

                // convierto de nombreCuenta a _id
                let respuestaUsuario = await UsuarioModel.findOne({ nombreCuenta: nombreCuentaAutor }, { _id: 1 })
                let _id = respuestaUsuario._id;

                resAggregate = await PostModel.aggregate(
                    [
                        {
                            '$match': {
                                'autor': ObjectId(_id)
                            }
                        },
                        {
                            '$lookup': {
                                'from': 'usuarios',
                                'localField': 'autor',
                                'foreignField': '_id',
                                'as': 'autor'
                            }
                        }, {
                            '$unwind': {
                                'path': '$autor'
                            }
                        }, {
                            '$project': {
                                'autor.password': 0,
                                'autor.pais': 0,
                                'autor.ciudad': 0,
                                'autor.biografia': 0,
                                'autor.fechaCreacion': 0,
                                'autor.email': 0,
                                'autor.token': 0,
                                'autor.__v': 0
                            }
                        }
                    ]
                )
            } else {
                resAggregate = await PostModel.aggregate(
                    [
                        {
                            '$lookup': {
                                'from': 'usuarios',
                                'localField': 'autor',
                                'foreignField': '_id',
                                'as': 'autor'
                            }
                        }, {
                            '$unwind': {
                                'path': '$autor'
                            }
                        }, {
                            '$project': {
                                'autor.password': 0,
                                'autor.pais': 0,
                                'autor.ciudad': 0,
                                'autor.biografia': 0,
                                'autor.fechaCreacion': 0,
                                'autor.email': 0,
                                'autor.token': 0,
                                'autor.__v': 0
                            }
                        }
                    ]
                )
            }

            res.send(resAggregate);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo más tarde.' })
        }

    },

    
    // borrar un post en concreto
    async borrarPost(req, res) {
        try {
            let { _id } = req.body;

            await PostModel.findOneAndDelete({ _id: _id });

            res.send({ message: "Post eliminado satisfactoriamente." })

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "No se ha podido eliminar el post." })
        }

    }
};

module.exports = PostController;