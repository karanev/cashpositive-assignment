var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("EventPost", new Schema({
    title : {
        type : String,
        required : [true, "Title field is required"]
    },
    date : {
        type : Date,
        required : [true, "Date field is required"]
    },
    organiserUsername : {
        type : String,
        required : [true, "Orgainser field is required"]
    },
    location: {
        type : String
    },
    description : {
        type : String
    },
    ticketPrice : {
        type : Number,
        default : 0
    }
}));