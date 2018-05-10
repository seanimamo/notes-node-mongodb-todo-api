// This is how we include mongoDB within a nodejs application
// note that this is commented out becaause we use destructing to include it instead
//const MongoClient = require('mongodb').MongoClient;

//This is how we include mongoDB within a nodejs appliaction using destructuring instead. Notice the normal way of doing this commented above directly above.
//Notice that we are also pulling off multiple things. this line also includes the equivalent of writing const ObjectID = require('mongodb').ObjectID;
//The ObjectID is a function incuded in mongoDB to create unique identifiers for things(whether they are related to mongoDB or not.)
const {MongoClient, ObjectID} = require('mongodb');

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

    //the findOneAndUpdate function takes three arguements, the filter to the find the object, the value to modify, and lastly an object where we can set various options
    //notice that in mongodb, there is an operator to update by, in this case we use $set (this replaces the value). Mongodb has many different update operators such as $inc that you can find online and are useful.
    //for more on operators go to https://docs.mongodb.com/manual/reference/operator/update/
    //For the third arguement, the options object, we set the returnOriginal attribute to false so that this function returns the updated document rather than the original.
   db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5af3c2bdae44ac2814a33944')
        },{ 
        $set:{
            completed:true
            } 
        },{
        returnOriginal:false
        }).then((result) => {
            console.log('------------------------------------------------');
            console.log(`Update mongodb document from the Todo collection: `);
            console.log(result);
            console.log('------------------------------------------------');
        }).catch((error)=>{
            console.log(`something went wrong trying to findOneAndUpdate a document in the Todos collection: ${error}`)
        });   

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5af3c522819f4701e07e509a')},{
            $set:{name:'Jensen'},
            $inc:{age:3}
        },
        {returnOriginal:false}).then((result) => {
            console.log('------------------------------------------------');
            console.log(`Update mongodb document from the User collection: `);
            console.log(result);
            console.log('------------------------------------------------');
        }).catch((error)=>{
            console.log(`something went wrong trying to findOneAndUpdate a document in the Users collection: ${error}`)
        });        
       
        


    //this line closes the connection to the database. We comment it out because it would close the connection to the database before we complete our asnychronous calls.
    //notice that we have to close the application by pressing ctrl + c if we do not actively use client.close() at the end of the node application.
    //client.close();
});