      var socket = io();
      var user_form = $('us');
      console.log('user_form  :' + JSON.stringify(user_form));
      $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
      });
      socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
      });