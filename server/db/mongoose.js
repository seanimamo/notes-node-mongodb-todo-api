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

//note that using ES6 exporting mongoose:mongoose is the saming as just writing mongoose because
//the variable and exported variable name are the same
module.exports = {
    mongoose
}