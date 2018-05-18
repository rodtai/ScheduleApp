var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/form', function (req, res) {
    res.render('form', {
        topicHead: 'Example Form'
    });
    console.log("Form Sent");
});
router.post('/form/add', function (req, res) {
    var person = {
        first: req.body.fname,
        last: req.body.lname
    };
    console.log(person.last);
    res.render('form', {
        topicHead: 'Sent Form',
        userValue: person
    });

});
module.exports = router;
