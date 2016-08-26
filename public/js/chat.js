// $(window).load(function(){
//       var socket = io();
//       //socket.emit('user enter', new_uname);
       
//       $('form').submit(function(){
//       socket.emit('msg->endpoint', $('#m').val());
//       $('#m').val('');
//       return false;
//       });
//       socket.on('msg->client', function(msg){
//       $('#messages').append($('<li>').text(msg));
//       });
// });

$(document).ready( function(){
      var socket = io.connect();
      var from = $.cookie('user');
      
      console.log(JSON.stringify(from));
      socket.emit('user enter', {user: from });
});