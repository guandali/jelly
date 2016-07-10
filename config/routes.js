
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var users = require('users');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename : function (req, res, cb) {
    cb(null, Date.now()+ '.png');
    
  }
});
var upload = multer({storage: storage});
console.log('@routes.js      upload is   ::'+ JSON.stringify(upload));

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

module.exports = function (app, passport) {


  //console.log('WHAT APP IS   ?:'+app);
  



  // cloudinary.uploader.upload("", function(result) { 
  // console.log(result) 
  // });

  app.get('/', home.index);
  app.get('/login',users.login);
  app.get('/signup',users.signup);
  app.post('/signup', users.createuser);
  app.get('/test',users.testui);
  app.get('/test0', users.testone);
  // Post authencicate req to /users/session passport.authenticate
  
  app.post('/users/session', passport.authenticate
  ('local', {
    
    failureRedirect:'/login',
    faliureFlash: 'Invalid Message'
  }), users.session
  );
  //app.post('/users/session',users.testReq )
  app.param('username', users.loadUser);
  app.get('/users/:username',users.displayUser );
  app.get('/logout', users.logout);
  // route to upload user's profile photo
  app.get('/uploadprofile',users.getUpload);
  app.post('/uploadprofile',upload.single('profile_photo'),users.uploadPhoto);
  //NEXT SECTION IS FOR TESTING
  app.get('/searchbar', home.search);
  app.post('/searchresults', users.get_search_results);
  //app.param('user_id', users.loadUser);
  app.post('/addfriend/:username',users.addfriend );

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
