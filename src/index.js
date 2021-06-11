"use strict"


const express = require("express");
const morgan = require("morgan");
const path = require("path");
require('dotenv').config();


const { CreatePost, getPost, getPostMetaData, getSinglePost, getNextPostsPage, numOfPages, getPostsForPaths } = require(path.join(
  __dirname,
  "./Handlers/blog-posts"
));
const { register } = require(path.join(
  __dirname,
  "./Handlers/users"
));

const PORT = 5000

let app = express();


app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(morgan("tiny"));
app.use(express.static("./server"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

//"../../client/build"
app.use(function (req, res, next) {
  req.db = db;
  next();
});
/*app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/build/index.html"));
})*/

///BLOG POSTS ENDPOINTS
app.post("/create-post", CreatePost)
app.get("/testGet", getPost)
app.get("/posts", numOfPages)
app.get("/posts/:page", getPostMetaData)
app.get("posts/:page", getNextPostsPage)
app.get("/post/:id/:title", getSinglePost)
app.get("/test", getPostsForPaths)

//USER ENDPOINTS

app.post('/register', register)

var MongoClient = require('mongodb').MongoClient;
var db;
let connectionString = process.env.MONGO_URI;

console.log(connectionString)

// Initialize connection once
MongoClient.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err, database) {
  if (err) throw err;
  db = database;

  // Start the application after the database connection is ready
  app.listen(PORT, () => console.info(`Listening on port ${PORT}`))
});





