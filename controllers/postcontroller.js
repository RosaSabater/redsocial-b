const PostModel = require('../models/Post');
const { validame } = require('validame');
const { ObjectId } = require('mongodb');
const UsuarioModel = require('../models/Usuario');
const FollowModel = require('../models/Follow');

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
                        { // busco los post donde el autor sea esta id
                            '$match': {
                                'autor': ObjectId(_id)
                            }
                        },
                        { // traes la información de la colleción usuarios
                            '$lookup': {
                                'from': 'usuarios',
                                'localField': 'autor',
                                'foreignField': '_id',
                                'as': 'autor'
                            }
                        }, { // traes los like que ha recibido este post
                            '$lookup': {
                                'from': 'likes',
                                'localField': '_id',
                                'foreignField': 'destino',
                                'as': 'usuariosLike'
                            }
                        }, {
                            '$unwind': {
                                'path': '$autor'
                            }
                        }, { // obtienes la información de cada persona que ha dado like
                            '$lookup': {
                                'from': 'usuarios',
                                'localField': 'usuariosLike.origen',
                                'foreignField': 'nombreCuenta',
                                'as': 'usuariosLike'
                            }
                        }, { // ordena por fecha de creación (más nuevos arriba)
                            '$sort': {
                                fechaCreacion: -1
                            }
                        }, { // quitas los campos que no necesitas
                            '$project': {
                                'autor.password': 0,
                                'autor.pais': 0,
                                'autor.ciudad': 0,
                                'autor.biografia': 0,
                                'autor.fechaCreacion': 0,
                                'autor.email': 0,
                                'autor.token': 0,
                                'autor.__v': 0,
                                'usuariosLike._id': 0,
                                'usuariosLike.token': 0,
                                'usuariosLike.password': 0,
                                'usuariosLike.email': 0,
                                'usuariosLike.fechaCreacion': 0,
                                'usuariosLike.pais': 0,
                                'usuariosLike.ciudad': 0,
                                'usuariosLike.biografia': 0
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
                            '$lookup': {
                                'from': 'likes',
                                'localField': '_id',
                                'foreignField': 'destino',
                                'as': 'usuariosLike'
                            }
                        }, {
                            '$unwind': {
                                'path': '$autor'
                            }
                        }, {
                            '$lookup': {
                                'from': 'usuarios',
                                'localField': 'usuariosLike.origen',
                                'foreignField': 'nombreCuenta',
                                'as': 'usuariosLike'
                            }
                        }, {
                            '$sort': {
                                fechaCreacion: -1
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
                                'autor.__v': 0,
                                'usuariosLike._id': 0,
                                'usuariosLike.token': 0,
                                'usuariosLike.password': 0,
                                'usuariosLike.email': 0,
                                'usuariosLike.fechaCreacion': 0,
                                'usuariosLike.pais': 0,
                                'usuariosLike.ciudad': 0,
                                'usuariosLike.biografia': 0
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

    async postSeguidos(req, res) {
        try {
            let { nombreCuenta } = req.body;

            let resAggregate = await FollowModel.aggregate(
                [
                    {
                        '$match': {
                            'origen': nombreCuenta
                        }
                    }, {
                        '$lookup': {
                            'from': 'usuarios',
                            'localField': 'destino',
                            'foreignField': 'nombreCuenta',
                            'as': 'relacion'
                        }
                    }, {
                        '$project': {
                            'relacion._id': 1,
                            "_id": 0
                        }
                    }
                ]);

            let arrayIdsSeguidos = (resAggregate).map(relacion => {
                return ObjectId(relacion.relacion[0]._id)
            });

            let resPostAggregate = await PostModel.aggregate(
                [
                    {
                        '$match': {
                            "autor": {
                                $in: arrayIdsSeguidos
                            }
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
                        '$lookup': {
                            'from': 'likes',
                            'localField': '_id',
                            'foreignField': 'destino',
                            'as': 'usuariosLike'
                        }
                    }, {
                        '$unwind': {
                            'path': '$autor'
                        }
                    }, {
                        '$lookup': {
                            'from': 'usuarios',
                            'localField': 'usuariosLike.origen',
                            'foreignField': 'nombreCuenta',
                            'as': 'usuariosLike'
                        }
                    }, {
                        '$sort': {
                            fechaCreacion: -1
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
                            'autor.__v': 0,
                            'usuariosLike._id': 0,
                            'usuariosLike.token': 0,
                            'usuariosLike.password': 0,
                            'usuariosLike.email': 0,
                            'usuariosLike.fechaCreacion': 0,
                            'usuariosLike.pais': 0,
                            'usuariosLike.ciudad': 0,
                            'usuariosLike.biografia': 0
                        }
                    }
                ]
            );

            res.send(resPostAggregate);
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