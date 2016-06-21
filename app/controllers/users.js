
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
    // console.log('req.body.content   is');
    // console.log(req.body.content);
    console.log(req.body.query_input);
    var key_word_for_search = req.body.query_input;
    User.find({username: new RegExp(key_word_for_search, "i")},function(err, result_user_by_keyword){
         console.log('@ testReq              result_user_by_keyword    ');
         console.log(JSON.stringify(result_user_by_keyword));
         var title = 'Display search results';
         console.log('TYPEOF      '+JSON.stringify(typeof(result_user_by_keyword)));
         //if (result_user_by_keyword == '') console.log('NULL')
         if(result_user_by_keyword == null) console.log('NULL')

         res.render('searchresults', 
         {    
             title: title,
             results:result_user_by_keyword 

         }
        );
    });
    //res.render('searchbar');
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

     cloudinary.uploader.upload(req.file.path, function(result) { 
       var new_profile_URL = result.secure_url;
       console.log('new_profile_URL    ::'+new_profile_URL);

       console.log('_user_id     :'+req.user._id);
       User.findByIdAndUpdate(req.user._id, { $set: {user_profile_photo:new_profile_URL}}, function(err, result_user){
           console.log('AFTER UPDATE::'+result_user.user_profile_photo);
           res.redirect('/users/'+result_user.username);

       });
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
