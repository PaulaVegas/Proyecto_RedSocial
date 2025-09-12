require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "network images",
	},
});

const upload = multer({ storage });

dbConnection();
app.use(
	cors({
		origin: "https://proyecto-frontend-red-social.vercel.app",
		credentials: true,
	})
);

app.use(express.json());
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));
app.use(typeError);
app.use(
	"/api-docs",
	swaggerUI.serve,
	swaggerUI.setup(docs, { explorer: true })
);
app.post("/upload", upload.single("picture"), (req, res) => {
	res.status(200).json({
		url: req.file,
	});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
