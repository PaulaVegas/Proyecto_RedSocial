const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

const { authentication, isAuth } = require("../middlewares/authentication");

const upload = require("../middlewares/multer");

router.post(
	"/",
	upload.single("image"),
	authentication,
	CommentController.create
);
router.get("/", CommentController.getAll);
router.put("/:_id", isAuth, authentication, CommentController.update);
router.delete("/:_id", isAuth, authentication, CommentController.delete);
router.post("/:_id/like", authentication, CommentController.likeComment);
router.post("/:_id/unlike", authentication, CommentController.unlikeComment);

module.exports = router;
