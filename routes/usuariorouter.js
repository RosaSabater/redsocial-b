const router = require ("express").Router();
const UsuarioController = require("../controllers/usuariocontroller");


router.post('/registro', UsuarioController.Registro);


module.exports = router;