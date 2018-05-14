var mongoose = require('mongoose');

// Our model for the user collection
var User = mongoose.model('User', {
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

//note that using ES6 exporting User:User is the saming as just writing User because
//the variable and exported variable name are the same
module.exports = {
    User
}