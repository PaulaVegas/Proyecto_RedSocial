const User = require("../models/User");
const Token = require("../models/Token");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

const UserController = {
  async create(req, res) {
    const { password, ...rest } = req.body;
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email already exists, please use another one" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUserData = { ...rest, role: "user", password: hashedPassword };

    User.create(newUserData)
      .then((user) =>
        res.status(201).send({
          message: "User created successfully",
          username: user.username,
        })
      )
      .catch(
        (err) =>
          console.error(err) &&
          res.status(500).send({ message: "Error creating user" })
      );
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ message: "Invalid user or password, try again" });
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      await Token.create({ userId: user._id, token });
      if (user.tokens.length > 3) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.status(200).send({ message: "Bienvenid@ " + user.username, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error logging in" });
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.find({}, "-password").populate({
        path: "posts",
        select: "_id title content",
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching users" });
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
        .select("-password")
        .populate({
          path: "posts",
          select: "_id title content",
        });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching user" });
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .select("-password")
        .populate("posts");
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching user info" });
    }
  },
  async update(req, res) {
    try {
      const { password, ...rest } = req.body;
      const hashedPassword = password
        ? bcrypt.hashSync(password, 10)
        : undefined;
      const updatedUserData = { ...rest, password: hashedPassword };
      const user = await User.findByIdAndUpdate(
        req.params._id,
        updatedUserData,
        { new: true }
      );
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating user" });
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      // Also delete all posts by this user
      await Post.deleteMany({ userId: req.params._id });
      res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error deleting user" });
    }
  },
  async logout(req, res) {
    try {
      console.log("Logging out user:", req.user._id);
      if (!req.user || !req.headers.authorization) {
        return res.status(401).json({ message: "No user or token found" });
      }
      const token = req.headers.authorization.split(" ")[1];
      await Token.findOneAndDelete({
        userId: req.user._id,
        token: token,
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error logging out" });
    }
  },
};

module.exports = UserController;
