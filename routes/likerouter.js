const router = require ("express").Router();
const LikeController = require("../controllers/likecontroller");
const auth = require("../middleware/auth");

router.post('/darLike', auth, LikeController.darLike);
router.post('/quitarLike', auth, LikeController.quitarLike);

module.exports = router;