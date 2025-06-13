const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.post("/newPost", PostController.createPost);
router.get("/", PostController.getAll);
router.get("/:_id", PostController.getById);
router.get("/title/:title", PostController.getByTitle);
router.delete("/:_id", PostController.delete);
router.put("/:_id", PostController.update);

module.exports = router;
