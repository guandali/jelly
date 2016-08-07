      var socket = io();
      socket.emit('subscribe', 'roomOne');
      console.log($("#" + current_username));
      $('form').submit(function(){
      socket.emit('server<-pcmsg', $('#m').val());
      $('#m').val('');
      return false;
      });
      socket.on('pcmsg->client', function(msg){
      $('#messages').append($('<li>').text(msg));
      });