const router = require ("express").Router();
const FollowController = require("../controllers/followcontroller");
const auth = require("../middleware/auth");

router.post('/darFollow', auth, FollowController.darFollow);
router.post('/quitarFollow', auth, FollowController.quitarFollow);
router.post('/comprobarFollow', auth, FollowController.comprobarFollow);
router.post('/getFollowers', auth, FollowController.getFollowers);
router.post('/getFollowing', auth, FollowController.getFollowing);


module.exports = router;