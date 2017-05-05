var express        = require('express');
var path           = require('path');
var bodyParser     = require('body-parser');
var fs             = require('fs');
var app            = express();

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-auth-token, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE');

    if (req && req.method == 'OPTIONS') {
      res.sendStatus(200);
    }
    else {
      next();
    }

}

app.use(allowCrossDomain);

//Routes Dependancy
var route = require('./url')(app);

//Set up the Error Pages
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(404);
    res.send({ message: "Not found"})
});

//Create the Server instance
app.listen(app.get('port'), function(){
  console.log('API Express server listening on port '+ app.get('port'));
});
