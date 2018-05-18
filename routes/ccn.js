require('dotenv').load();
const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//TWS: Why have these declared up here when you do it again below in the POST route?
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

//TWS: Pulls in schema for contact model which already handles Mongo connection.
var Contact = require('../models/contact');

var numbers;
var addedNumbers = [];
var message;
var groupSend;
var numberGroup;

// TWILIO Functionality
const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_MESSAGING_SERVICE_SID
);

module.exports.createContact = function(newContact, callback) {
    console.log("test ccn " + newContact);
};

router.get('/contact', function(req, res){
    res.render('contact');
});

// //Message
router.post('/', function (req, res, next) {

    res.send({messageFromServer: 'Got message!'});
    message = req.body.message;
    groupSend = req.body.groupSend;

    //TWS: Below line references the 'Contact' model and tells app to go find all contacts with Families Group.
    Contact.find({group: groupSend}, function(err, contacts){
        if (err) throw err;
        console.log(contacts);


    if (message != '') {
        contacts.forEach(contact=> { //TWS: ForEach loop iterating through the contacts array created from DB query.
            console.log(contact.number);
            addedNumbers.push(contact.number)
        });
        console.log("Mongo Numbers: " + addedNumbers);
        numbers = addedNumbers;

        Promise.all(
            numbers.map(numbers => {
                return twilio.messages.create({
                    to: numbers,
                    from: process.env.TWILIO_MESSAGING_SERVICE_SID,
                    body: message
                });
            })
        )

            .then(messages => {
                console.log('Messages sent!');

            })
            .catch(err => console.error(err));
    } else {
        req.flash('success', 'Contact added');
        console.log("number added");
        return null;
    }

        addedNumbers = [];
        console.log("addedNumbers Cleared: " + addedNumbers);
    });



    if (req.body.number != null){

        console.log("addedNumbers: " + req.body.group);
        var errors = req.validationErrors();
        if(errors){
            res.render('contact',{
                errors:errors
            });
        } else {
            var newContact = new Contact({
                number:req.body.number,
                group: req.body.group
            });
            Contact.createContact(newContact, function(err, contact){
                if(err) throw err;
                console.log(contact);
            });
            req.flash('success_msg', 'Number added');
        }
    } else {
        console.log("no number");
    }

});

router.get('/', function (req, res, next) {
});

module.exports = router;