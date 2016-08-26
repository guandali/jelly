$(window).load(function(){
      var socket = io();
      alert('#{uname}');
      socket.emit('user enter ', new_uname);
       
      $('form').submit(function(){
      socket.emit('msg->endpoint', $('#m').val());
      $('#m').val('');
      return false;
      });
      socket.on('msg->client', function(msg){
      $('#messages').append($('<li>').text(msg));
      });
});
