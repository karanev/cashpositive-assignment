var express = require("express");

// Used to create, sign and verify tokens
var jwt = require("jsonwebtoken");

var User = require("../models/user");
var config = require("../../config");

router = express.Router();

// Route to setup the demo with 2 Participants and 1 Organiser
router.get("/setup", function(request, response) {
    // Create 1 organiser
    var karan = new User({
        username : "karanev",
        password : "passwordkaran",
        organiser : true
    });

    karan.save(function(error) {
        if (error) throw error;

        console.log("Oragniser Karan created successfully");
    });

    // Create 2 participants
    var rohan = new User({
        username : "rohan",
        password : "passwordrohan",
        organiser : false
    });

    rohan.save(function(error) {
        if (error) throw error;

        console.log("Participant Rohan created successfully");
    });

    var pranjul = new User({
        username : "pranjul",
        password : "passwordpranjul",
        organiser : false
    });

    pranjul.save(function(error) {
        if (error) throw error;

        console.log("Participant Pranjul created successfully");
    });
    
    response.json({success: true});
});

// Route to sign up
router.post("/signup", function(request, response) {
    // Check if both username and password are present
    if (request.body.username && request.body.password) {
        User.findOne({username: request.body.username}, function(error, user) {
            if (error) throw error;
            
            if (user) {
                // Username is already registered
                response.json({ success: false, message: "This username is already registered" });
            } else {
                // Create the user in db
                User.create(request.body, function(error, user) {
                    if (error) throw error;

                    if (!user) {
                        response.json({ success: false, message: "Sign Up failed" });
                    } else {
                        // Successfully created the user
                        response.json({ success: true, message: "Sign up successfully"});
                    }
                });
            }
        });
    } else {
        response.json({ success: false, message: "Either username or message is missing" });
    }
});

// Route to authenticate a user
router.post("/authenticate", function(request, response) {
    // Finding the user
    User.findOne({
        username: request.body.username
    }, function(error, user) {
    
        if (error) throw error;
    
        if (!user) {
            response.json({ success: false, message: "Authentication failed. User not found." });
        } else if (user) {
            // Check if password matches
            if (user.password != request.body.password) {
                response.json({ success: false, message: "Authentication failed. Wrong password." });
            } else {

                // if user is found and password is right
                // create a token based on organiser or participant
                const payload = {
                    organiser: user.oraganiser 
                };
                var token = jwt.sign(payload, config.secretKey, {
                    expiresIn: 24*60*60 // expires in 24 hours
                });
    
                // return the token
                response.json({
                    success: true,
                    message: "Authenticated! Token expires in 24 hours.",
                    token: token
                });
            }   
        }
    });
});

// route middleware to verify a token
router.use(function(request, response, next) {
    // check header or url parameters or post parameters for token
    var token = request.body.token || request.query.token || request.headers["x-access-token"];
    
    // decode token
    if (token) {    
        // verifies secret and checks expiry
        jwt.verify(token, config.secretKey, function(error, decoded) {      
            if (error) {
                return response.json({ success: false, message: "Failed to authenticate token." });    
            } else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;
                console.log(decoded);
                next();
            }
        });
    
    } else {
        // if there is no token
        // return an error
        return response.status(403).send({ 
            success: false, 
            message: "No token provided." 
        });
    }
});

// Test for middleware verifying a token
/*
router.get("/users", function(request, response) {
    User.find({}, function(error, users) {
        response.json(users);
    });
});
*/

module.exports = router;