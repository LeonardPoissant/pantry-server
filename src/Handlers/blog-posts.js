const ObjectID = require("mongodb").ObjectID;

const createPost = async (req, res) => {
	const db = req.db.db("test");
	const post = req.body;
	const date = new Date();

	try {
		await db.collection("Post").insertOne({
			post,
			date,
		});
		res.status(201).json({
			status: 201,
			data: post,
		});
	} catch (err) {
		res.status(500).json({
			data: post,
			message: "Something went wrong",
			err: err,
		});
		console.log(err);
	}
};

const getPostsMetaData = async (req, res) => {
	const db = req.db.db("test");
	const pageNumber = req.params.page;

	const nPerPage = 5;

	try {
		const projection = {
			ObjectId: 1,
			"post.title": 1,
			"post.description": 1,
			"post.category": 1,
			date: 1,
		};
		const posts = await db
			.collection("Post")
			.find({}, { projection })
			.skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
			.limit(5)
			.sort({ date: -1 })
			.toArray();

		res.status(201).json({
			status: 201,
			data: posts,
		});
	} catch (err) {
		res.status(500).json({
			data: "post,",
			message: "Something went wrong",
			err: err,
		});
		console.log(err);
	}
};

const getSinglePost = async (req, res) => {
	const db = req.db.db("test");
	const postParams = req.params;

	try {
		const post = await db
			.collection("Post")
			.findOne({ _id: ObjectID(postParams.id) });

		res.status(201).json({
			status: 201,
			data: post,
		});
	} catch (err) {
		console.log("er0", err);
	}
};

const numOfPages = async (req, res) => {
	const db = req.db.db("test");
	let maxBlogPostsPerPage = 5;
	let arrayOfPages = [];

	try {
		const numOfBlogPosts = await db.collection("Post").estimatedDocumentCount();
		if (numOfBlogPosts % maxBlogPostsPerPage != 0) {
			arrayOfPages = [
				...Array(Math.ceil(numOfBlogPosts / maxBlogPostsPerPage)).keys("a"),
			];
		} else {
			arrayOfPages = [...Array(numOfBlogPosts / maxBlogPostsPerPage).keys("a")];
		}

		res.status(201).json({
			status: 201,
			data: arrayOfPages,
		});
	} catch (err) {
		console.log("ERR", err);
		res.status(500).json({
			data: "post,",
			message: "Something went wrong",
			err: err,
		});
	}
};

module.exports = {
	createPost,
	getPostsMetaData,
	getSinglePost,
	numOfPages,
};
