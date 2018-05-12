// This server.js file will use mongoose rather than mongodb
var mongoose  = require('mongoose');

// *IMPORTANT LINE, this enables mongoose to use promises, since it does not by default
mongoose.Promise = global.Promise;

// This is the line used to connect to our database. Notice that we do not have to use a callback and execute our database queries within it.
// this is because mongoose handles the order of things and ensures that queries will nott be run UNTIL the connection to the database is established.
// note that the nodejs course did not use promises for the connect function, but I have added it on anyways because it is supported.
mongoose.connect('mongodb://localhost:27017/MongooseTodoApp').then((result)=>{
    //notice that the succesful promise from the connect function returns undefined
    console.log('Sucessfully connected to database: ',result);
}).catch((error)=>{
    console.log(`something went wrong trying to connect to the MongooseTodoApp database: ${error}`);
});


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
        required: true,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

// Before we can add a Todo document to the collection, we have to create a new instance of a Todo mongoose model object
// once we create the model, we can then run database functions on it.
// Note that the trim attribute in our model will get rid of the extra whitespace
// notice this todo will unsuccessfully be saved because there are other required attributes
var newTodo = new Todo({
    text:'    Cook dinner'
});


// Our model for the user collection
var User = mongoose.model('User', {
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

//instantiating a new user object
var newUser = new User({
    email:'sampleemail@gmail.com   '
});



//note that when setting the completedAt value in mongoose, 0 = the year 1970, negative starts going before 1970 and positive goes ahead of 1970.
// Note that the trim attribute in our model will get rid of the extra whitespace
var newTodo2 = new Todo({
    text:'    Iron Clothes',
    completed: false,
    completedAt: 123
});

// this function takes our model object above with only 1 attribute and attempts to save it to the database.

// newTodo.save().then((result)=>{
//     console.log('Sucessfully added todo to database: ',result);
// }).catch((error)=>{
//     console.log(`something went wrong trying to add our Todo to the database: ${error}`);
// });

// newTodo2.save().then((result)=>{
//     console.log('Sucessfully added todo to database: ',JSON.stringify(result, undefined, 2));
// }).catch((error)=>{
//     console.log(`something went wrong trying to add our Todo to the database: ${error}`);
// });

newUser.save().then((result)=>{
    console.log('Sucessfully added User to database: ',JSON.stringify(result, undefined, 2));
}).catch((error)=>{
    console.log(`something went wrong trying to add our User to the database: ${error}`);
});