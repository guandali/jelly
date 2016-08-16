      var socket = io();
      var uname = $("input[name=" + name + "]").val();
      if (uname){
            socket.emit('uname', uname);
      }
      $('form').submit(function(){
      socket.emit('msg->endpoint', $('#m').val());
      $('#m').val('');
      return false;
      });
      socket.on('msg->client', function(msg){
      $('#messages').append($('<li>').text(msg));
      });