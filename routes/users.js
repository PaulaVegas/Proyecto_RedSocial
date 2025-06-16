const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.get("/", authentication, UserController.getAll);
router.get("/me", authentication, UserController.getMe);
router.get("/:_id", authentication, UserController.getById);
router.put("/:_id", authentication, UserController.update);
router.delete("/:_id", authentication, UserController.delete);

module.exports = router;
