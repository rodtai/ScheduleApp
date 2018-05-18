var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClassSchema = new Schema({
    name: {
        type: String,
        required: 'name cannot be blank'
    },
    teacher: {
        type: String,
        required: 'teacher cannot be blank'
    },
    monday: [{startmod: Number, endmod: Number}],
    tuesday: [{startmod: Number, endmod: Number}],
    wednesday: [{startmod: Number, endmod: Number}],
    thursday: [{startmod: Number, endmod: Number}],
    friday: [{startmod: Number, endmod: Number}],
});
mongoose.model('Class', ClassSchema);