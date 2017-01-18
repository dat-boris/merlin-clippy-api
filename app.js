// server.js
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var watson = require('./conversation.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Add CORs headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var port = process.env.PORT || 3000;        // set our port
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Hello to our wizardry world' });
});

router.get('/talk', function(req, res) {
    res.json({ message: 'hooray! lets get wizard watson to hack!' });
});

router.post('/talk', function(req, res) {
    var message = req.body.message;
    if (!message) {
        throw "No message seen!";
    }

    watson.ask(
        message,
        function (responseMessage) {
            res.json({
                source: message,
                response: responseMessage
            });
        }
    )
});


// START THE SERVER
app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);