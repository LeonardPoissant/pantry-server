
const ObjectID = require('mongodb').ObjectID;

const CreateMetaTags = async (req, res) => {
  const db = req.db.db('test');

  const metaInfo = req.body;

  console.log('meta', metaInfo)

  let imgUrl = metaInfo.imgUrl;
  let description = metaInfo.description

  try {

    await db.collection("meta").insertOne({
      imgUrl,
      description

    })

    res.status(201).json({
      status: 201,
      data: metaInfo

    })

  } catch (err) {
    console.error('err---', err)
  }
}

const getMeta = async (req, res) => {
  const db = req.db.db('test');

  try {
    const metaInfo = await db.collection("meta").find().toArray()

    console.log('METAINFO', metaInfo)

    res.status(201).json({
      status: 201,
      data: metaInfo
    })

  } catch (err) {
    console.error('errr---', err)
  }
}



const CreatePost = async (req, res) => {
  const db = req.db.db('test');
  const post = req.body
  const id = new ObjectID

  console.log('post', post)
  const title = post.title;
  const description = post.description;
  const category = post.category;
  const date = new Date();
  const convertedContent = post.convertedContent

  try {
    const createDB = await db
      .collection("Post")
      .insertOne({
        id,
        title,
        description,
        category,
        date,
        convertedContent

      }
      );
    res.status(201).json({
      status: 201,
      data: post
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

const getPostMetaData = async (req, res) => {
  const pageNumber = req.params.page;
  const db = req.db.db('test');

  const nPerPage = 5;


  try {
    const projection = { ObjectId: 1, "post.title": 1, "post.description": 1, "post.category": 1, "date": 1 };
    const posts = await db
      .collection("Post")
      .find({}, { projection })
      .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
      .limit(5).sort({ 'date': -1 }).toArray()

    res.status(201).json({
      status: 201,
      data: posts
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
}
const getPostsForPaths = async (req, res) => {

  const db = req.db.db('test');


  try {
    const projection = { ObjectId: 1, "post.title": 1 };
    const posts = await db
      .collection("Post")
      .find({}, { projection }).toArray()

    console.log('POSTS', posts)

    res.status(201).json({
      status: 201,
      data: posts
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
}

const numOfPages = async (req, res) => {
  const db = req.db.db('test');
  let maxBlogPostsPerPage = 5;
  let arrayOfPages = [];

  try {
    const numOfBlogPosts = await db.collection("Post").estimatedDocumentCount();
    if (numOfBlogPosts % maxBlogPostsPerPage != 0) {
      arrayOfPages = [...Array(Math.ceil(numOfBlogPosts / maxBlogPostsPerPage)).keys('a')];
    } else {
      arrayOfPages = [...Array(numOfBlogPosts / maxBlogPostsPerPage).keys('a')];
    }



    res.status(201).json({
      status: 201,
      data: arrayOfPages
    });
  } catch (err) {
    console.log('ERR', err)
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });

  }

}

const getNextPostsPage = async (req, res) => {
  const db = req.db.db('test');
  try {
    const createDB = await db
      .collection("Post")
      .find().toArray()

    res.status(201).json({
      status: 201,
      data: createDB
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
}

const getPost = async (req, res) => {
  const db = req.db.db('test');



  try {
    const createDB = await db
      .collection("Post")
      .find().toArray()

    res.status(201).json({
      status: 201,
      data: createDB
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }


}

const getSinglePost = async (req, res) => {
  const db = req.db.db('test');
  const get = req.params
  console.log('TITLE', get)

  try {

    const post = await db
      .collection("Post")
      .findOne({ _id: ObjectID(get.id) })

    console.log('post-----, ', post)


    res.status(201).json({
      status: 201,
      data: post
    });

  } catch (err) {
    console.log('er0', err)
  }
}

module.exports = {
  CreatePost,
  getPost,
  getPostMetaData,
  getSinglePost,
  getNextPostsPage,
  numOfPages,
  getPostsForPaths,
  CreateMetaTags,
  getMeta
}