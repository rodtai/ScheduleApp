var Class = require('../models/class');

exports.scheduleGET = function () {
    Class.find({},function (err, classes) {
        if(err) throw err;
        console.log(classes);
        return classes;
    });
};