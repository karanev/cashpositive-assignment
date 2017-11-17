var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Logs requests to console
var morgan = require("morgan");

var mongoose = require("mongoose");

// Used to create, sign and verify tokens
var jwt = require("jsonwebtoken");
var config = require("./config");

// Connect to the databse
mongoose.connect(config.database);

// Set secret key to variable
app.set("secretKey", config.secretKey);

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Initialize routes
app.use("/api", require("./app/routes/api"));

app.get("/", function(request, response) {
    response.send("The api is at /api");
});

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for request");
});