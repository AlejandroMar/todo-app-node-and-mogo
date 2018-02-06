//Add body Parser
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//Conect to the database
mongoose.connect('mongodb://test:test@ds125318.mlab.com:25318/todo');

//create a schema, this is like a blue print
let todoSchema = new mongoose.Schema({
    item: String
});
//Create model for collection
let Todo = mongoose.model('Todo', todoSchema);


//let data = [{item: 'study js'}, {item: 'cook lunch'}, {item: 'play with Anton'}];
let urlencodedParser = bodyParser.urlencoded({extended:false});



module.exports = function(app){
    //here come the request handlers
    app.get('/todo', function(req, res){
        //Get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
        
        
    });
   
    app.post('/todo', urlencodedParser, function(req, res){
        //Get data from the view and added to mogodb
        let newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mogodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};