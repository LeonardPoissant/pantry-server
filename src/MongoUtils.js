const { MongoClient } = require('mongodb');
require('dotenv').config();
//const url = process.env.url
//const url = "mongodb+srv://Leonard:yy33kxVFWq98hhKA@cluster0.owjm6.mongodb.net/test?retryWrites=true&w=majority"

var _db;
console.log('urs', url)
module.exports = {

    connectToServer: function (callback) {
        console.log('url', url)
        MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
            function (err, client) {
                _db = client.db('test');

                return callback(err);
            });
    },

    getDb: function () {

        console.log('-db', _db)
        return _db;
    }
};