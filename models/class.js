var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/scheduleapp');
var Schema = mongoose.Schema;

var classSchema = new Schema(
    {
        name: String,
        teacher: String,
        mods: Array
    },
    {
        collection: 'schoolschedule'
    }
);
var Class = mongoose.model('Class', classSchema);

module.exports = Class;