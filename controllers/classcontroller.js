var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var classObjResult = {};

exports.classObj = function () {
    return classObjResult;
};

exports.findAll = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("scheduleapp");
        dbo.collection("schoolschedule").findOne({}, function (err, result) {
            if (err) throw err;
            classObjResult = result;
            console.log(result);
            db.close();
        });
    });
};
