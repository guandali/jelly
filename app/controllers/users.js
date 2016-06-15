
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
var wrap = require('co-express')
var User = mongoose.model('User')
// var cloudinary = require().v2;

var cloudinary = require('cloudinary');
console.log('@users.js   __dirname'+__dirname);


exports.login = function (req, res) {
    res.render('login', { title: 'Login' });
};

exports.testReq = function(req, res){
    console.log('users.js :: users.testReq ::'  + JSON.stringify(req.user))
    res.redirect('/');
};

exports.session = login;

function login(req, res) {
    console.log('users.session at users.js');
    // const redirectTo = req.session.returnTo
    //     ? req.session.returnTo
    //     : '/';
    // delete req.session.returnTo;
    console.log('req.body.username  :::: '+ req.body.username)
    res.redirect('/users/'+ req.body.username);
}

exports.signup = function(req, res){
    console.log('@users.js :: req.baseUrl for signup   '+ req.baseUrl);
    console.log('---->signup page');
    res.render('signup',{
        title: 'create a new account'
        // user: new User()
    });
    
};
// Using passort logout
exports.logout = wrap ( function* (req, res){
    console.log('@users.js:: users.logout');
    req.logout();
    res.redirect('/');

});
// exports.uploadProfilePhoto = wrap( function*(req, res){
     


// });

exports.getUpload = wrap( function*(req, res){
    res.render('uploadprofile',{title: 'Upload new profile photo'});
     


});
exports.displayUser = wrap( function* (req, res, next){
    //console.log('@users.displayUser ---> req.profile  :: '+ JSON.stringify(req.profile));
    var user = req.profile;
    console.log('@users.loadUser :: user.username:::'+ user.username)
    res.render('userprofile',{user:user});

});
exports.uploadPhoto = wrap(function *(req, res, next){
    console.log('@ users.uploadPhoto');
    
    console.log('req.files is'+ JSON.stringify(req.file));
   // console.log('req.files.upload_profile  is   '+ JSON.stringify(req.files.upload_profile));
    // console.log(JSON.stringify(req.profile_photo));
    // console.log(JSON.stringify(req.file.profile_photo));

    //console.log('req is::::::::::::');
    //console.log(req);
    var _image = req.file;
    console.log('_image is :'+JSON.stringify(_image));
    console.log('_image.path is ::  '+_image.path);
    console.log('@users.js   __dirname'+__dirname);

     cloudinary.uploader.upload(req.file.path, function(result) { 
      
       console.log(result) 
     });

});
exports.loadUser = wrap (function*(req, res, next, username ){
    const criteria = {username: username};
    console.log('username is at users.loadUser :: ' + username);
    User.findOne(criteria, function(err, result_user){
        req.profile = result_user
        if (!req.profile){
            console.log('!req.profile')
            return next(new Error('User not found'));
        }
        console.log('result_user is at users.loadUser ::'+JSON.stringify(result_user));
        next();
        

    });
});

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
