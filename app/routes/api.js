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

// Route to authenticate a user
router.post('/authenticate', function(request, response) {
    
    // Finding the user
    User.findOne({
        username: request.body.username
    }, function(error, user) {
    
        if (error) throw error;
    
        if (!user) {
            response.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // Check if password matches
            if (user.password != request.body.password) {
                response.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                const payload = {
                    organiser: user.oraganiser 
                };
                var token = jwt.sign(payload, config.secretKey, {
                    expiresIn: 24*60*60 // expires in 24 hours
                });
    
                // return the token
                response.json({
                    success: true,
                    message: 'Authenticated! Token expires in 24 hours.',
                    token: token
                });
            }   
        }
    });
});

module.exports = router;