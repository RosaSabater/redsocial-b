const PostModel = require('../models/Post');
const { validame } = require('validame');
const { ObjectId } = require('mongodb');

const PostController = {

    // postear
    async Post(req, res) {
        try {
            let { mensaje } = req.body;

            let error = validame(mensaje, { req: 2, min: 1, max: 280, allow: "aA 1 _ ñÑ !" });
            if (error) {
                return res.status(400).send({ message: "Post: " + error });
            };

            if (!req.usuario) {
                return res.status(401).send({ message: "Ha ocurrido un error." })
            }

            await PostModel.create({
                mensaje,
                autor: ObjectId(req.usuario._id),
                fechaCreacion: new Date,
                numeroRepost: 0,
                numeroLikes: 0,
                repost: null,
                hashtags: [],
                menciones: []
            });

            res.send({ message: 'Post publicado correctamente.' });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo más tarde.' })
        }
    },


    // ver todos los post
    async getPosts(req, res) {

        try {
            const resAggregate = await PostModel.aggregate(
                [
                    // {
                    //     '$match': {
                    //         'autor': new ObjectId('5fd3c9cf731f5f5bac709605')
                    //     }
                    // },
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

            res.send(resAggregate);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo más tarde.' })
        }

    },

    async getMisPost(req,res) {

        try {
            const resAggregate = await PostModel.aggregate(
                [
                    {
                        '$match': {
                            'autor': new ObjectId(req.usuario._id)
                        }
                    } , {
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

            res.send(resAggregate);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error, inténtelo más tarde.' })
        }
    },


    // borrar un post en concreto
    async borrarPost(req, res) {
        try {
            await PostModel.findOneAndDelete({ autor: req.usuario._id });

            res.send({ message: "Post eliminado satisfactoriamente." })

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "No se ha podido eliminar el post." })
        }

    }
};

module.exports = PostController;