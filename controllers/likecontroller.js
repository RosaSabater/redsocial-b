const { ObjectId } = require('mongodb');
const LikeModel = require('../models/Like');

const LikeController = {

    async darLike(req, res) {
        try {
            await LikeModel.updateOne(
                {
                    origen: req.usuario.nombreCuenta, destino: ObjectId(req.body.destino)
                },
                {
                    origen: req.usuario.nombreCuenta, destino: ObjectId(req.body.destino)
                },
                {
                    upsert: true
                }
            );


            res.send({ message: 'Has dado like.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error al dar like.' });
        }
    },

    async quitarLike(req, res) {
        try {
            await LikeModel.deleteOne({ origen: req.usuario.nombreCuenta, destino: ObjectId(req.body.destino) });

            res.send({ message: 'Has quitado like.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error al quitar like.' })
        }
    },

};

module.exports = LikeController;