// This is controller for socktets 
var users_list = []


module.exports.response = function ( endpoint,socket_io, online_users) {
    console.log('online_users' + JSON.stringify(online_users));
   //console.log(JSON.stringify(socket_io));
   console.log('@ sockets.js reponse()');

   socket_io.on('online-->server', function (data) {
       socket_io.name = data.user;
       console.log('socket_io.name  :' + socket_io.name);

       if (!online_users[data.user]){
           online_users[data.user] = data.user;
           console.log('online_users :' + JSON.stringify(online_users));

       }
       endpoint.emit('online-->client', {users:online_users, user: data.user});

       socket_io.on('online-->server:say', function(data){
           // if to everyone, just broadcast to all  
           if (data.to == 'all'){
               socket_io.broadcast.emit('say', data);
           } else {
               // find the user matches up 
               var clients = endpoint.sockets.client();
               clients.forEach(function(client) {
                if (client.name == data.to){
                    client.emit('say', data);
                }   
               });
           }
           
       });

       
   })
   socket_io.on('msg->endpoint', function (msg) {
       endpoint.emit('msg->client', msg);
      console.log('msg ::' + msg);
   });
   socket_io.on('username', function (msg) {
       console.log('Print uname ::' + JSON.stringify(msg));
   });
 
};

exports.gochat = function (req, res ){
    //console.log('session ' + JSON.stringify(req.session));
    //console.log('session ' + JSON.stringify(req.user));
   // var result = req.cookie('user');
    //console.log('JSON.stringify(client)  :: ' + JSON.stringify(result));
    res.render('chatpage', {'uname':req.user.username});
   

}




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

