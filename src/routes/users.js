const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

const { authentication } = require("../middlewares/authentication");

const upload = require("../middlewares/multer");

router.post("/register", upload.single("image"), UserController.register);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.get("/", authentication, UserController.getAll);
router.get("/info", authentication, UserController.getInfo);
router.get("/:username", authentication, UserController.getByName);
router.get("/:_id", authentication, UserController.getById);
router.put(
	"/:_id",
	authentication,
	upload.single("image"),
	UserController.update
);
router.delete("/:_id", authentication, UserController.delete);
router.post("/:_id/follow", authentication, UserController.followUser);
router.post("/:_id/unfollow", authentication, UserController.unfollowUser);
router.get("/:_id/followers", authentication, UserController.getFollowers);
router.get("/:_id/following", authentication, UserController.getFollowing);

module.exports = router;
