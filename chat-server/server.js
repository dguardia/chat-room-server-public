//server.js

//Import all our dependecies
var express   = require('express');
var mongoose  = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//tell express whee to server the public folder
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://127.0.0.1:27017/david-chat");



//Create a model from the chat schema

var Chat = mongoose.model('Chat', ChatSchema);


//allow CORS
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  	if(rep.method == 'OPTIONS') {
  		res.status(200).end();
  	} else {
  		next();
  	}
});


/*||||||||||||||||||||||ROUTES|||||||||||||||||||||||||*/
// route for our index file
app.get('/', function(req, res){
	//send the index.html in our public directory
	res.sendFile('index.html');
});

//This route is simply run only on first launch just to generate some chat history
app.post('/setup', function(req, res){
	var chatData = [{
		created: new Date(),
    content: 'Hi',
    username: 'Chris',
    room: 'php'
  }, {
    created: new Date(),
    content: 'Hello',
    username: 'Obama',
    room: 'laravel'
  }, {
    created: new Date(),
    content: 'Ait',
    username: 'Bill',
    room: 'angular'
  }, {
    created: new Date(),
    content: 'Amazing room',
    username: 'Patience',
    room: 'socet.io'
}];

//Loop through each of the chat data and insert into the database
for(var c =0; c < chatData.length; c++) {
  //Create an instance of the chat model
  var newChat = new Chat(chatData[c]);

  //Call save to insert the chat
  newChat.save(function (err, savedChat) {
    console.log(savedChat);
  });
}

//Send a resoponse so the serve would not get stuck
    res.send('created');

});


//This route produces a list of chat as filterd by 'room' query
app.get('/msg', function(req, res){
    //Find
    Chat.find({
        'room' : req.query.room.toLowerCase()
    }).exec(function(err, msgs){
        //Send
        res.json(msgs);
    })
});

/*||||||||||||||||||END ROUTES|||||||||||||||||||||*/

/*||||||||||||||||SOCKET|||||||||||||||||||||||*/
//Listen for connection
io.on('connection', function(socket){
    //Globals
    var defaulRoom = 'general';
    var rooms = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];

})