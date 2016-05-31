var express = require('express'),
    path = require('path'),
    config = require('./config/config.js')


    var app = express();
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('hogan-express'));
app.set('view engine','html');

app.use(express.static(path.join(__dirname,'views')));

app.set('port',process.env.PORT||4000);

//Setting config
app.set('host',config.host);

//Socket IO
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var exec = require('child_process').exec;

//Routing
require('./routes/routes.js')(express,app,io,fs,exec);

server.listen(app.get('port'),function(){
        console.log('eSim Runing on port : '+app.get('port'));
})