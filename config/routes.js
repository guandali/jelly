
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var users = require('users');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index);
  app.get('/login',users.login);
  app.get('/signup',users.signup);
  app.post('/signup', users.createuser);
  // Post authencicate req to /users/session passport.authenticate
  
  app.post('/users/session', passport.authenticate
  ('local', {
    
    failureRedirect:'/login',
    faliureFlash: 'Invalid Message'
  }), users.session
  );
  //app.post('/users/session',users.testReq )
  
  

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
