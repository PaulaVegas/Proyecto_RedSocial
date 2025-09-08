const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

const { authentication } = require("../middlewares/authentication");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "meowspace_posts",
	},
});

const upload = multer({ storage });

router.post(
	"/newPost",
	upload.single("image"),
	authentication,
	PostController.createPost
);
router.get("/", PostController.getAll);
router.get("/:_id", PostController.getById);
router.get("/title/:title", PostController.getByTitle);
router.delete("/delete/:_id", authentication, PostController.delete);
router.put(
	"/update/:_id",
	authentication,
	upload.single("image"),
	PostController.update
);
router.post("/:_id/like", authentication, PostController.likePost);
router.post("/:_id/unlike", authentication, PostController.unlikePost);
router.post("/:_id/toggle-like", authentication, PostController.toggleLike);

module.exports = router;
