"use strict";
//Get express module
let express = require('express');

//Get my todoController module
let todoController = require('./controllers/todoController');

//Fire the app function from express
let app = express();

//Set up template engine
app.set('view engine', 'ejs');

//static files with express middleware,no route so it will be global
app.use(express.static('./public'));

//Fire controllers
todoController(app);

//Listen to a port
app.listen(3000);
console.log('You are listening to port: 3000');


