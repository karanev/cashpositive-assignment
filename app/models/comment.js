var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Comment", new Schema({
    comment : {
        type : String,
        required : [true, "Comment is required"]
    },
    date : {
        type : Date,
        required : [true, "Date of comment is required"]
    },
    username : {
        type : String,
        required : [true, "Username field is required"]
    },
    eventId : {
        type : Number,
        required : [true, "EventId is required"]
    }
}));