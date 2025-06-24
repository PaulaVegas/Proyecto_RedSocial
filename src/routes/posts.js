const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

router.post(
	"/newPost",
	upload.single("image"),
	authentication,
	PostController.createPost
);
router.get("/", PostController.getAll);
router.get("/:_id", PostController.getById);
router.get("/title/:title", PostController.getByTitle);
router.delete("/:_id", authentication, PostController.delete);
router.put("/:_id", authentication, PostController.update);
router.post("/:_id/like", authentication, PostController.likePost);
router.post("/:_id/unlike", authentication, PostController.unlikePost);

module.exports = router;
