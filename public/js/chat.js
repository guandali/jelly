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
});