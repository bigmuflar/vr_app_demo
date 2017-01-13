var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// middleware
var vrMorgan = () => {
    return (req, res, next) => {
        console.log('Loaded: ' + req.path);
        next();
    };
};
app.use(vrMorgan());

// add a public static route handler
app.use(express.static('public'))

// set up a basic root route
app.get('/', function(req, res) {
    res.sendFile("index.html", { root: './public/html' });
});



// set up express listener to listen to port 3000
app.listen(3000, (err) => {
    if (err) {
        console.log("Error:", err);
        process.exit(1);
    }
    console.log("Server is listening to port 3000");
});
