const basicInfo = require("./basicInfo");
const components = require("./components");
const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");

module.exports = {
	...basicInfo,
	...users,
	...posts,
	...comments,
	...components,
};
