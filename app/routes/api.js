var express = require("express");
var User = require("../models/user");

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

module.exports = router;