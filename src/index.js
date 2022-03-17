"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const auth = require("./auth");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const {
	createPost,
	getPostsMetaData,
	getSinglePost,
	numOfPages,
} = require(path.join(__dirname, "./handlers/blog-posts"));
const { register, login } = require(path.join(__dirname, "./handlers/users"));

const PORT = 5000;

let app = express();

app.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Methods",
		"OPTIONS, HEAD, GET, PUT, POST, DELETE"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, x-access-token"
	);
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.use(morgan("tiny"));
app.use(express.static("./server"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

app.use(function (req, res, next) {
	req.db = db;
	next();
});

///BLOG POSTS ENDPOINTS
app.post("/create-post", auth, createPost);
app.get("/posts", numOfPages);
app.get("/posts/:page", getPostsMetaData);
app.get("/post/:id/:title", getSinglePost);

//USER ENDPOINTS

app.post("/register", register);
app.post("/login", login);

var db;
let connectionString = process.env.MONGO_URI;

// Initialize connection to db once
MongoClient.connect(
	connectionString,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
	function (err, database) {
		if (err) throw err;
		db = database;

		// Start the application after the database connection is ready
		app.listen(process.env.PORT || PORT, () =>
			console.info(`Listening on port ${PORT}`)
		);
	}
);
