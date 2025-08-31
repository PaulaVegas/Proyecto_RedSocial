const mongoose = require("mongoose");
require("dotenv").config();
const Post = require("./src/models/Post");

async function assignUserToPosts() {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Conectado a MongoDB Atlas");

		const userId = "685058c9a879ae18110ae751";

		const result = await Post.updateMany(
			{ userId: { $exists: false } },
			{ $set: { userId } }
		);

		console.log("Posts actualizados:", result.modifiedCount);
		mongoose.disconnect();
	} catch (err) {
		console.error(err);
	}
}

assignUserToPosts();
