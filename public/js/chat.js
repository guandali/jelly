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
      var to = 'all'; // Default is to all users 
      
      console.log(JSON.stringify(from));
      socket.emit('online-->server', {user: from });
      socket.on('online-->client', function(data){
            if (data.user != from) {
            var sys = '<div style="color:#f00">SYSTEM(' + now() + '):' + 'USER ' + data.user + ' Online！</div>';
            } else {
            var sys = '<div style="color:#f00">SYSTEM(' + now() + '):You enter chat room！</div>';
            }
            $("#contents").append(sys + "<br/>");
            //
            flushUsers(data.users);
            //
            showSayTo();
      


      });
      // 
   socket.on('say', function (data) {
      // To all 
      if (data.to == 'all') {
            $("#contents").append('<div>' + data.from + '(' + now() + ')to  everyone  say：<br/>' + data.msg + '</div><br />');
      }
      //Private
      if (data.to == from) {
            $("#contents").append('<div style="color:#00f" >' + data.from + '(' + now() + ')To You say：<br/>' + data.msg + '</div><br />');
      }
      });

      
            function flushUsers(users) {
                  $("#list").empty().append('<li title="Double Click to Chat" alt="all" class="sayingto" onselectstart="return false">All</li>');
                  
                  for (var i in users) {
                  $("#list").append('<li alt="' + users[i] + '" title="Double Click to Chat" onselectstart="return false">' + users[i] + '</li>');
                  }
                        $("#list > li").dblclick(function() {
                        if ($(this).attr('alt') != from) {      
                              to = $(this).attr('alt');       
                              $("#list > li").removeClass('sayingto');                  
                              $(this).addClass('sayingto');
                              showSayTo();
                        }
                        });
            }
            function showSayTo() {
                  $("#from").html(from);
                  $("#to").html(to == "all" ? "ALL" : to);
            }

            function now() {
                  var date = new Date();
                  var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
                  return time;
            }

            // chat 
            $("#say").click(function(){
                  // the msg needed to send 
                  var $msg = $("#input_content").html();
                  if ($msg== "") return; 
                  // Add the msg to DOM 
                  if (to == "all"){
                        $("#contents").append('<div>You(' + now() + ') are talking to everyone: <br/>' + $msg + '</div><br />');

                  }else{
                        $("#contents").append('<div style="color:#00f" >You(' + now() + ')speaking ' + to + ' say：<br/>' + $msg + '</div><br />');
                  }
                  // Submit the msg 
                  socket.emit('online-->server:say', {from: from, to: to, msg: $msg});
                  $("#input_content").html("").focus();
            });
});