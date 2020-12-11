const router = require ("express").Router();
const UsuarioController = require("../controllers/usuariocontroller");
const auth = require("../middleware/auth");


router.post('/registro', UsuarioController.Registro);
router.post('/login', UsuarioController.Login);
router.post('/logout', auth, UsuarioController.Logout);
router.delete('/delete', auth, UsuarioController.Delete);


module.exports = router;