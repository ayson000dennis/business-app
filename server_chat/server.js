
//first we import our dependencies...
// var config = require('./config.js');
// fullstack:fullstack@ds145193.mlab.com:45193
// import Express from 'express';
// var express = require('express');
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// var inc = require('mongoose-auto-increment');


var io = require('socket.io').listen(http);
var http = require("http");
var server = http.createServer();
var listener = io.listen(server);

// mongoose.connect('mongodb://dennis.fullstack:Midori1989@ds151014.mlab.com:51014/gopage_chat',{
//   useMongoClient: true,
//   /* other options test*/
//
// });
// inc.initialize(mongoose)

// console.log(mongoose.connection.readyState);

  listener.sockets.on('connection', function(socket){

    // Recieve member data
    socket.on('message_send', function(data){

      if(data.user_type === 'business'){

        // Send data from member
        socket.broadcast.emit('message_by_business',{
          'message': data.message,
          'from': data.from,
          'user_type': data.user_type
        });


      } else {

        // Send data from business
        socket.broadcast.emit('message_by_member',{
          'message': data.message,
          'from': data.from,
          'user_type': data.user_type
        });

      }

  });

});

server.listen(8001);
