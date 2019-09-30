require('./config/mongoose')

var express = require('./config/express');

// Create a new Express application instance
var app = express();

// Use the Express application instance to listen to the port
app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + ' ..');
});

// const server = app.listen(process.env.PORT || 8000, function() {
//     console.log('Express server listening on port ' + server.address().port + ' ..');
// });