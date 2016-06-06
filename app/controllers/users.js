
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
var wrap = require('co-express')
var User = mongoose.model('User')


exports.session = login;

function login (req, res) {
  console.log('users ----> login');
//   res.render('login', {
//     title: 'Please log in'
//   });
  //const redirectTo = req.session.returnTo
  // SOME THING IS UNSET****
  res.redirect(redirectTo);
};

exports.signup = function(req, res){
    console.log('---->signup page');
    res.render('signup',{
        title: 'create a new account'
        // user: new User()
    });
    
};

exports.createuser = wrap (function* (req, res) {
  console.log('users.ts ::==> createuser')
   console.log('req.body.unhashed_passowrd is'+ JSON.stringify(req.body.unhashed_password))
   const user = new User(req.body)
   user.provider = 'local';
   yield user.save()
   console.log(JSON.stringify(user))
   console.log('Try to find this user from db');
   console.log('Now user._id ::'+ user._id)
   User.findOne({'_id':user._id},function(err, result_user){
     console.log(JSON.stringify(result_user))
   });
   
       req.logIn(user, err => {
        if (err)
            req.flash('info', 'Sorry! We are not able to log you in!');
        return res.redirect('/');
    });
  
});
