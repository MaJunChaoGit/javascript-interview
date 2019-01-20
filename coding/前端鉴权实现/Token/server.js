let express = require("express"); 
let app = express(); 
let bodyParser = require('body-parser'); 
let auth = require('./auth.js'); 
let chalk = require('chalk');

app.use(bodyParser.json());

app.get('/login', function(req, res, next) { 
  console.log(req);
  let Token = auth.makeToken(); 
  res.json({ result: "success", token: Token }, 200)
});

app.use('*', [auth.validate] ,function(req, res, next) { 
  res.send('success'); 
}); 

app.listen(9090);