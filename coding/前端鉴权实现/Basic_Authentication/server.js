let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));


app.get('/Authentication_base', function(req, res) {
  console.log('req.headers.authorization:', req.headers);
  if (!req.headers.authorization) {
    res.set({
      'WWW-Authenticate': 'Basic realm="ma"'
    });
    res.status(401).end();
  } else {
    let base64 = req.headers.authorization.split(" ")[1];
    let userPass = new Buffer(base64, 'base64').toString().split(':');
    let user = userPass[0];
    let pass = userPass[1];
    if (user === 'ma' && pass === '123') {
      res.end('OK');
    } else {
      res.status(401).end();
    }
  }
});

app.listen(9090);
