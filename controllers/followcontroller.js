const FollowModel = require('../models/Follow');

const FollowController = {

    async darFollow(req,res) {
        try {
            await FollowModel.create({origen: req.usuario.nombreCuenta, destino: req.body.destino});

            res.send({ message: 'Usuario seguido.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error dando follow.' });
        }
    },

    async quitarFollow (req,res) {
        try {
            await FollowModel.deleteOne({origen: req.usuario.nombreCuenta, destino: req.body.destino});

            res.send({ message: 'Usuario dejado de seguir.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error quitando tu follow.' })
        }
    },

    async comprobarFollow(req,res) {
        try {

            let respuestaPromesas = await Promise.all([
                FollowModel.findOne({ origen: req.usuario.nombreCuenta, destino: req.body.destino }),
                FollowModel.findOne({ origen: req.body.destino, destino: req.usuario.nombreCuenta})
            ])

            let [yoTeSigo, tuMeSigues] = respuestaPromesas;

            res.send({
                yoTeSigo: !!yoTeSigo,
                tuMeSigues: !!tuMeSigues
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error comprobando follow.' });
        }
    },

    async getFollowers(req,res) {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error.' })
        }
    },

    async getFollowing(req,res) {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error.' })
        }
    }

};

module.exports = FollowController;