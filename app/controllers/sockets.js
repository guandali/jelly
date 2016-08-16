// This is controller for socktets 

module.exports.response = function ( endpoint,socket_io) {
   //console.log(JSON.stringify(socket_io));
   console.log('@ sockets.js reponse()');
   socket_io.on('msg->endpoint', function (msg) {
       endpoint.emit('msg->client', msg);
      console.log('msg ::' + msg);
   });
   socket_io.on('uname', function (msg) {
       console.log('Print uname ::' + JSON.stringify(msg));
   });
 
};


module.exports.response_notused = function ( endpoint, socket_io) {
     console.log('@ sockets.js response__used()');
     socket_io.on('subscribe', function(room) { 
        console.log('-----------');
       // console.log(socket_io.request);
        console.log('joining room', room);
        socket_io.join(room); 
    })
     socket_io.on('server<-pcmsg', function(msg) {
        console.log('sending message');
        endpoint.emit('pcmsg->client', msg);
    });

  

};

