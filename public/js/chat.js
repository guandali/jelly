      var socket = io();
      socket.emit('subscribe', 'roomOne');
      $('form').submit(function(){
      socket.emit('server<-pcmsg', $('#m').val());
      $('#m').val('');
      return false;
      });
      socket.on('pcmsg->client', function(msg){
      $('#messages').append($('<li>').text(msg));
      });