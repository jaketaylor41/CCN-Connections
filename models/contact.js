const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Contact Schema
const ContactSchema = mongoose.Schema({
    group: {
        type: String,
        required:true
    },
    number: {
        type: String,
        required:true
    },
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.createContact = function(newContact, callback){
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(newContact.number, salt, function(err, hash) {
    //         newContact.number = hash;
    newContact.save(callback);
    // });
    // });
};

// module.exports.getContactByGroup = function(group, callback){
//     var query = {group: group};
//     Group.findOne(query, callback);
// };

module.exports.getContactById = function(id, callback){
    Contact.findById(id, callback);
};