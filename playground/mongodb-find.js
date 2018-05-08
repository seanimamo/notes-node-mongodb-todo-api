// This is how we include mongoDB within a nodejs application
// note that this is commented out becaause we use destructing to include it instead
//const MongoClient = require('mongodb').MongoClient;

//This is how we include mongoDB within a nodejs appliaction using destructuring instead. Notice the normal way of doing this commented above directly above.
//Notice that we are also pulling off multiple things. this line also includes the equivalent of writing const ObjectID = require('mongodb').ObjectID;
//The ObjectID is a function incuded in mongoDB to create unique identifiers for things(whether they are related to mongoDB or not.)
const {MongoClient, ObjectID} = require('mongodb');

// Here is an example of creating a unique object id using the objectID() function.
// this will print out a unique mongo style string id that can serve as an ID for something we want.
var obj = new ObjectID();
console.log(`Example of using the ObjectID() function to create a unique mongo style string id: ${obj}`);
console.log('--------------------------------------------------------');
// This is an example of an es6 feature called object destructing. It lets you create a variable that pulls an attribute from an object
// in this example, the name attribute of the user object is pulled(aka destructured) and created into another variable called name.
var user = {name:'sean', age:'22'};
var {name, age} = user; 
console.log(`example of using ES6 object destructuring to create the name and age variables by pulling attributes from the user object: name: ${name}, age: ${age}`) //this prints 'sean'
console.log('--------------------------------------------------------');
// This is what is used to connect to a partiuclar mongoDB. In a real production environment this url would point to something like an AWS link or a heroku app
// It takes two arguements, the database URL followed by the name of the database you want to connect to. (Note that in this case, TodoApp did not exist, but
// mongodb automatically creates this database in the event that it does not exist).
// The second arguemenet is a callback containing an err variable, which is created if an error connecting to the database occurs and a client variable for
// specifying what database to connect to and then manipulating the database in various ways
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
       return console.log('Unable o connect to MongoDB server');
    }
    console.log('Connected to the MongoDB server');
    
    //initializing the db variable to point to the collection we want 
    const db = client.db('TodoApp');


    //this line closes the connection to the database
    //client.close();
});