const { MongoClient } = require('mongodb');
const url = "mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority";

var _db;

module.exports = {

    connectToServer: function (callback) {
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