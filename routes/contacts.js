var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Contact = require('../models/contact');

// Contact
router.get('/contact', function(req, res){
    var db = req.db;
    // Fetch from 'users' collection
    Contact.find({}, {}, function(e, docs) {
        res.render('contact', {'contacts' : docs});
    });
});

//TWS: Below line references the 'Contact' model and tells app to go find all contacts with Families Group.
Contact.find({}, function(err, contacts){
    if (err) throw err;
    console.log(contacts);
    contacts.forEach(contacts=> { //TWS: ForEach loop iterating through the contacts array created from DB query.
        // console.log(contacts.number);
        // console.log(contacts.group);

    });
});

module.exports = router;



