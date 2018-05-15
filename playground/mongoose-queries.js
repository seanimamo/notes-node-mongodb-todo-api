const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')

var todoId = '5af6478b061b98203475093d';
var userId = '5af727d8120f21841a11fc65';

if(!ObjectId.isValid(todoId)){
    console.log('ERROR: This is not a valid id');
}
//notice that using mongoose we dont have to write 'new ObjectID(id)' for the_id property anymore because mongoose does it for us.
//example of find mongoose find query, this one returns an array rather than a document
Todo.find({
    _id: todoId
}).then((todos)=>{
    if(todos.length == 0){
        return console.log('Id not found!');
    }
    console.log('find() Todo', todos);
}).catch((e)=>{
    console.log(e);
});

//example of findOne mongoose find query
Todo.findOne({
    _id: todoId
}).then((todo)=>{
    if(!todo){
        return console.log('Id not found!');
    }
    console.log('findOne() Todo', todo)
}).catch((e)=>{
    console.log(e);    
});

//example of findById mongoose find query
Todo.findById(todoId).then((todo)=>{
    if(!todo){
        return console.log('Id not found!');
    }
    console.log('findById() Todo', todo)
}).catch((e)=>{
    console.log(e);    
});

User.findById(userId).then((user)=>{
    if(!user){
        return console.log('User Id not found!');
    }
    console.log('findById() User', user)
}).catch((e)=>{
    console.log(e);    
});