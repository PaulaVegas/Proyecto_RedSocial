const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const authentication = require("../middlewares/authentication");

router.post("/", authentication, CommentController.create);
router.get("/", CommentController.getAll);
router.put("/:_id", authentication, CommentController.update);
router.delete("/:_id", authentication, CommentController.delete);

module.exports = router;
