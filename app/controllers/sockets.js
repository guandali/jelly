// This is controller for socktets 

module.exports.response = function ( endpoint,socket_io) {
   //console.log(JSON.stringify(socket_io));
   console.log('@ sockets.js reponse()');
   socket_io.on('chat message', function (msg) {
       endpoint.emit('chat message', msg);
      console.log('msg ::' + msg);
   });
 
}