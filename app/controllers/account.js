// user-specific information 
// * upload profile photo 
// * update password
// * add phone number 
// * add website link
var mongoose = require('mongoose');
var User = mongoose.model('User');
var cloudinary = require('cloudinary');




exports.getUpload =  function (req, res){
    console.log('account route:: getUpload');
    res.render('uploadprofile',{title: 'Upload new profile photo'});
};


exports.uploadPhoto = function(req, res, next){
     console.log('@ account.uploadPhoto');

     cloudinary.uploader.upload(req.file.path, function(result) { 
       var new_profile_URL = result.secure_url;

       User.findByIdAndUpdate(req.user._id, { $set: {user_profile_photo:new_profile_URL}}, function(err, result_user){
           res.redirect('/users/'+result_user.username);

       });
     });

};

exports.getUpdate = function(req, res){
     
     console.log(' account.getUpdate  ');
     
    


};

// account.updateProfile 
exports.updateProfile = function(req, res){
     
     console.log(' account.updateProfile ');
     
    


};


