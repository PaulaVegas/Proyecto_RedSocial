const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const authentication = require("../middlewares/authentication");

router.post("/newPost", authentication, PostController.createPost);
router.get("/", PostController.getAll);
router.get("/:_id", PostController.getById);
router.get("/title/:title", PostController.getByTitle);
router.delete("/:_id", authentication, PostController.delete);
router.put("/:_id", authentication, PostController.update);

module.exports = router;
