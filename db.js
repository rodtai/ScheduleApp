var MongoClient = require('mongodb').MongoClient;
var state = {
    db: null
};

exports.connect = function (url, done) {
    if (state.db) {
        return done;
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("scheduleapp");
        console.log(dbo.collection("schoolschedule"));
        done();
    });
};
exports.get = function () {
    return state.db;
};

exports.close = function () {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        })
    }
};
