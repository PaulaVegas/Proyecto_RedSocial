module.exports = {
	MONGO_URI:
		"mongodb+srv://<name>:<password>@cluster0-tuqrv.mongodb.net/test?retryWrites=true&w=majority",
	JWT_SECRET: process.env.JWT_SECRET || "default_secret_key",
};
// Replace <name> and <password> with your MongoDB credentials
