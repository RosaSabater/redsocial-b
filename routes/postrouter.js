const router = require ("express").Router();
const PostController = require("../controllers/postcontroller");
const auth = require("../middleware/auth");

router.post('/post', auth, PostController.Post);
router.post('/getPosts', auth, PostController.getPosts);
router.post('/borrarPost', auth, PostController.borrarPost);
router.post('/postSeguidos', auth, PostController.postSeguidos);

module.exports = router;