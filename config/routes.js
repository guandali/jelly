
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var users = require('users');
var account = require('account');
var multer = require('multer');
var sockets = require('sockets');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename : function (req, res, cb) {
    cb(null, Date.now()+ '.png');
    
  }
});
var upload = multer({storage: storage});
//console.log('@routes.js      upload is   ::'+ JSON.stringify(upload));

//console.log(path);
//console.log('@routes.js :: join    :'+ JSON.stringify(join));
var cloudinary = require('cloudinary');
cloudinary.config({  
  cloud_name: 'dlehndc9n', 
  api_key: '151992173381421', 
  api_secret: 'f7xc11yowP29Gf8nNOjtiftxAh8' 
});

//console.log('@routes.js ::: cloundinary :: '+ JSON.stringify(cloudinary))

/**
 * Expose
 */

module.exports = function (app, passport, io) {
  var chat_flag = 0;
  
  //Set socket on 
  // io.on('connection', function(socket){
  //   //console.log('io.sockets  ----' + JSON.stringify(io.sockets));
  // //  console.log('----a user connected----');
  // if (chat_flag = 0 ){
  //     console.log('First user connected');

  // }
  //  io.of('/').clients(function (err, clients) {
  //    if (err) throw err;
  //    console.log('Namespace#clients' + clients); 
  //  });
  //  socket.on('chat message', function (msg) {
  //      io.emit('chat message', msg);
  //  });
  // });

  var chat = io 
     .of('/')
     .on('connection', function (socket) {
       sockets.response(chat, socket);
     });
  //io.sockets.on('connection', sockets.response__used );// response__used 
  app.get('/', home.index);
  app.get('/login',users.login);
  app.get('/signup',users.signup);
  app.post('/signup', users.createuser);
  app.get('/test',users.testui);
  app.get('/test0', users.testone);
  app.get('/chatpage',users.gochat);
  app.get('/pop-up/:username_0/:request_id', users.get_pop_up);
  // The following is account routing 
  // update account
    // route to upload user's profile photo
   app.get('/account/uploadprofile',account.getUpload);
   app.post('/account/uploadprofile',upload.single('profile_photo'),account.uploadPhoto);
   // account getUpdate and account update 
   app.get('/account/getUpdate', account.getUpdate);
   app.post('/account/updateProfile', account.updateProfile);
  


  // Post authencicate req to /users/session passport.authenticate
  
  app.post('/users/session', passport.authenticate
  ('local', {
    
    failureRedirect:'/login',
    faliureFlash: 'Invalid Message'
  }), users.session
  );
  //app.post('/users/session',users.testReq )

  // app.param('req_msg', function(req, res, next, req_msg){
  //   req.req_msg = req_msg;
  //   console.log('typeof req.request_info  is ' + typeof req.req_msg);
  //   console.log('typeof req.user is ' + typeof req.user);
  //   next();
  // });

   app.param('accept_user_id',function(req, res, next, id){
    next();
   });
  app.param('username_0',function(req, res, next, id){
    next();
  });
  app.param('username_1',function(req, res, next, id){
    next();
  });
  app.get('/users/:username',users.displayUser );
  app.post('/users/acceptfriend/:accept_user_id',users.acceptfriend);
  app.post('/users/:username_0/addfriend/:username_1', users.addfriend);
  app.get('/logout', users.logout);

  //NEXT SECTION IS FOR TESTING
  app.get('/searchbar', home.search);
  app.post('/searchresults', users.get_search_results);
  //app.param('user_id', users.loadUser);
  //app.post('/addfriend/:username',users.addfriend );
  //action= '/users/'+req.user.username+'/addfriend/' + result.username


  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
