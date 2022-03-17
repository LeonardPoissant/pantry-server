require("dotenv").config();
let jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const db = req.db.db("test");
	const userName = req.body.userName;
	const email = req.body.email;
	const password = req.body.password;

	try {
		await db.collection("User").insertOne({
			userName,
			email,
			password,
		});
		res.status(201).json({
			status: 201,
			data: userName,
		});
	} catch (err) {
		res.status(500).json({
			message: "Something went wrong",
			err: err,
		});
		console.log(err);
	}
};

const login = async (req, res) => {
	const db = req.db.db("test");
	const email = req.body.email;
	const password = req.body.password;
	const secretEmail = process.env.email;
	const secretPassword = process.env.password;
	const privateKey = process.env.secretKey;
	const condition = email === secretEmail && password === secretPassword;

	if (condition) {
		try {
			const existingUser = await db
				.collection("User")
				.findOne({ email: emaddil, password: password });

			if (existingUser) {
				const token = jwt.sign({ user: existingUser.userName }, privateKey, {
					expiresIn: "2h",
				});
				res.status(201).json({
					status: 201,
					data: token,
				});
			}
		} catch (err) {
			res.status(500).json({
				message: "Something went wrong",
				err: err,
			});
			console.log(err);
		}
	} else {
		res.status(500).json({
			message: "You shall not pass",
		});
	}
};

module.exports = {
	register,
	login,
};
