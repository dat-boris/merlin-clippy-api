// server.js
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Hello to our wizardry world' });
});

router.get('/talk', function(req, res) {
    res.json({ message: 'hooray! lets get wizard watson to hack!' });
});

router.post('/talk', function(req, res) {
    res.json({ source: req.body, response: 'I hear you loud and clear! you said '+req.body.message });
});


// START THE SERVER
app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);