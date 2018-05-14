var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//process.env is the way we access environmental variables. proces.env.PORT is what a service such as heroku would need to start our application.
//this variable does not exist on local machines however, so we make this default to 3000 in the case that process.env.PORT does not exist
const port = process.env.PORT || 3000;

//note this is ES6 syntax for var mongoose =  require('./db/mongoose.js').mongoose;
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

app.listen(port, () =>{
    console.log(`started on port ${port}`);
});

app.use(bodyParser.json());

//example of our database API for posting a new todo
app.post('/todos', (req,res)=> {
    var newTodo = new Todo({
        text:req.body.text
    });
    newTodo.save().then((result) =>{
        console.log('saved todo to database');
        res.send(result);
    }).catch((error)=>{
        console.log('ERROR: failed to save todo to database');
        //note that we are sending an HTTP status of 400 along with the error
        res.status(400).send(error);
    });
   // console.log(req.body);
});

app.get('/todos',(req,res)=>{
    //this is how we find all documents in a collection using mongoose
    Todo.find().then((todos)=>{
        //note that it is better to send objects, not arrays, so that we can add attributes if we need to.
        res.send({
            todos,
            customCode:'Succesfully fetched all todos from database.'
        });
    }).catch((error)=>{
        res.status(400).send(error);
    });

});



// // Before we can add a Todo document to the collection, we have to create a new instance of a Todo mongoose model object
// // once we create the model, we can then run database functions on it.
// // Note that the trim attribute in our model will get rid of the extra whitespace
// // notice this todo will unsuccessfully be saved because there are other required attributes
// var newTodo = new Todo({
//     text:'    Cook dinner'
// });

// //instantiating a new user object
// var newUser = new User({
//     email:'sampleemail@gmail.com   '
// });


// //note that when setting the completedAt value in mongoose, 0 = the year 1970, negative starts going before 1970 and positive goes ahead of 1970.
// // Note that the trim attribute in our model will get rid of the extra whitespace
// var newTodo2 = new Todo({
//     text:'    Iron Clothes',
//     completed: false,
//     completedAt: 123
// });

// // this function takes our model object above with only 1 attribute and attempts to save it to the database.

// // newTodo.save().then((result)=>{
// //     console.log('Sucessfully added todo to database: ',result);
// // }).catch((error)=>{
// //     console.log(`something went wrong trying to add our Todo to the database: ${error}`);
// // });

// // newTodo2.save().then((result)=>{
// //     console.log('Sucessfully added todo to database: ',JSON.stringify(result, undefined, 2));
// // }).catch((error)=>{
// //     console.log(`something went wrong trying to add our Todo to the database: ${error}`);
// // });

// newUser.save().then((result)=>{
//     console.log('Sucessfully added User to database: ',JSON.stringify(result, undefined, 2));
// }).catch((error)=>{
//     console.log(`something went wrong trying to add our User to the database: ${error}`);
// });