
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
var wrap = require('co-express')
var User = mongoose.model('User')


exports.login = function (req, res) {
  console.log('---->login page');
  res.render('login', {
    title: 'Please log in'
  });
};

exports.signup = function(req, res){
    console.log('---->signup page');
    res.render('signup',{
        title: 'create a new account'
        // user: new User()
    });
    
};

exports.createuser = function (req, res) {
  console.log('users.ts ::==> createuser')
   console.log('req.body.unhashed_passowrd is'+ JSON.stringify(req.body.unhashed_password))
   const user = new User(req.body)
   user.provider = 'local';
   user.save()
   console.log(JSON.stringify(user))
   console.log('Try to find this user from db');
   console.log('Now user._id ::'+ user._id)
   User.findOne({'_id':user._id},function(err, result_user){
     console.log(JSON.stringify(result_user))
   });
  
}
