var express = require("express");

var app = express();

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for request");
});