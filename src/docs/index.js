const basicInfo = require("./basicInfo");
const components = require("./components");
const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");

module.exports = {
	...basicInfo,
	paths: {
		...users.paths,
		...posts.paths,
		...comments.paths,
	},
	...components,
};
