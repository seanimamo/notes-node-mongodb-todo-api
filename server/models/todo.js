var mongoose = require('mongoose');

// In mongodb, we can create documents within the same collection that dont have the same type or number of attributes,
// However in mongoose, documents are made to be stricter. We define the model for the documents within a collection so that
// all documents have a uniform structure to them. It makes our database much more clean, professional & error prone.
// note that if you enter a number for the text property, mongoose will auto typecast it to string
var Todo = mongoose.model('Todo', {
    text:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

//note that using ES6 exporting Todo:Todo is the saming as just writing Todo because
//the variable and exported variable name are the same
module.exports = {
    Todo
}