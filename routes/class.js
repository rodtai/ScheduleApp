var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
/* GET home page. */
router.get('/today', function (req, res) {
    var day = new Date().getDay() - 1;
    var url = '/class/' + daysOfWeek[day];
    res.redirect(url);
});
router.get('/addform', function (req, res) {
    res.render('addclass', {
        daysArr: daysOfWeek
    });
});
router.post('/addform/submit', function (req, res) {
    for ()
        var classObj = {
            name: req.body.class,
            teacher: req.body.teacher
        };
    console.log(req.body);
    res.render('submit', {
        nameOfForm: "Add Class"
    });
});
router.get('/:day', function (req, res, next) {
    var isValidDay = false;
    var day = req.params.day.toString().toLowerCase();
    for (var i = 0; i < daysOfWeek.length; i++) {
        if (day === daysOfWeek[i]) {
            isValidDay = true;
            break;
        }
    }
    if (isValidDay) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("scheduleapp");
            dbo.collection('schoolschedule').find({
                    [day]: {$exists: true}
                },
                {
                    fields: {
                        _id: 1,
                        name: 1,
                        [day]: 1
                    },
                    sort: {
                        [day]: 1
                    }
                }).toArray(
                function (err, result) {
                    if (err) throw err;
                    console.log("Schedule Rendered");
                    res.render('schedule', {
                        schedule: result,
                        chosenday: day
                    });
                })
        });
    }
    else {
        next();
    }
});
router.get('/:classname', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("scheduleapp");
        dbo.collection("schoolschedule").findOne({"name": req.params.classname}, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('class', {
                course: result
            });
            db.close();
        });
    })
});
module.exports = router;
