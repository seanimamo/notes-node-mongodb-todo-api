// This is how we include mongoDB within a nodejs application
// note that this is commented out becaause we use destructing to include it instead
//const MongoClient = require('mongodb').MongoClient;

//This is how we include mongoDB within a nodejs appliaction using destructuring instead.
const {MongoClient} = require('mongodb');

// This is an example of an es6 feature called object destructing. It lets you create a variable that pulls an attribute from an object
// in this example, the name attribute of the user object is pulled(aka destructured) and created into another variable called name.
var user = {name:'sean', age:'22'};
var {name} = user; 
console.log(name) //this prints 'sean'

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

    // example of inserting a 'Todo' document (record) into the Todo collection
    // note that althought an _id attribute is automatically created, we can overwrite this value if we want when inserting an object
    //result.ops is an object containing all documents that were inserted
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // }, (err,result) =>{
    //     if(err) {
    //         return('Unable to insert into the Todo collection: ', err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined, 2));
    // });

    // example insert a new document(record) into the User collection
    // The object _id attribute has the timestamp for when it was inserted contained within its first 12 bytes
    // by calling the .getTimestamp() method on a particular documents _id, (in this case we only insert one so we refernce it by result.ops[0]._id), we call .getTimestamp() on it to get the time and date it was created/inserted
    // db.collection('Users').insertOne({
    //     name:'Sean Imam',
    //     age:'22',
    //     location: 'Maryland, USA'
    // },(err,result)=>{
    //     if(err) {
    //         return('Unable to insert document into the User collection: ', err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined, 2));
    //     console.log(`This Document was inserted into Users collection at: ${result.ops[0]._id.getTimestamp()}`);
    // });

    //this line closes the connection to the database
    client.close();
});