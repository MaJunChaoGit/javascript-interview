var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');  
var RedisStore = require('connect-redis')(session);
var app = express();
var secret = 'wang839305939';

app.use(cookieParser(secret));
app.use(session({
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379,
    db: 0
  }),
  secret: secret
}));

app.get('/', function(req, res) {
  var session = req.session;
  session.time = session.time || 0;
  var n = session.time++;
  res.send('hello, session id: ' + session.id + ' count:' + n);
});

app.listen(9090);