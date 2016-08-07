// This is controller for socktets 

module.exports.response__notused = function ( endpoint,socket_io) {
   //console.log(JSON.stringify(socket_io));
   console.log('@ sockets.js reponse()');
   socket_io.on('chat message', function (msg) {
       endpoint.emit('chat message', msg);
      console.log('msg ::' + msg);
   });
 
};


module.exports.response_used = function ( endpoint, socket_io) {
     console.log('@ sockets.js response__used()');
     socket_io.on('subscribe', function(room) { 
        console.log('-----------');
        console.log(socket_io.request);
        console.log('joining room', room);
        socket_io.join(room); 
    })
     socket_io.on('server<-pcmsg', function(msg) {
        console.log('sending message');
        endpoint.emit('pcmsg->client', msg);
    });

  

};

