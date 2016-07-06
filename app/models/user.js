
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
//var bcrypt = require('bcrypt');
//var SALT_WORK_FACTOR = 10;
var crypto1 = require('crypto');
var Schema = mongoose.Schema;
var default_img_URL = 'http://res.cloudinary.com/dlehndc9n/image/upload/c_scale,w_200/v1465669328/default_profile_photo_waetkr.png';
/**
 *  FriendRequestSchema 
 */
var FriendRequestSchema = new Schema({
    userName: String, 
    requestMessage: String,
    date: Date 
    
});
/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '' },
  username: {type: String, default:''},
  pendingFriendList:[FriendRequestSchema],
    // Add something more ***** July 4th 2016
  friendList: [{
      username: String,
      date: Date 


  }],

  user_profile_photo:{type: String, default:default_img_URL},
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});
const validatePresenceOf = value => value && value.length;


UserSchema
    .virtual('unhashed_password').
    set( function (unhashed_password) {
      this._password = unhashed_password;
      this.salt = this.makeSalt();
      console.log('Salt is ::::'+JSON.stringify( this.salt));
      console.log('password before encryption is ::'+ unhashed_password);
      this.hashed_password = this.encryptPassword(unhashed_password);
      console.log('hashed_password is::::'+this.hashed_password);
      }).get(function(){
        console.log('_password is::::'+JSON.stringify(_password));
        return this._password;
      });


UserSchema.pre('save', function (next) {
    if (!this.isNew)
        return next();
    if (!validatePresenceOf(this.password) ) {
        next(new Error('Invalid password'));
    }
    else {
        next();
    }
});

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {});


UserSchema.methods.authenticate= function (plainText) {
         return this.encryptPassword(plainText) === this.hashed_password;
   }
UserSchema.methods.makeSalt = function(){
       return Math.round((new Date().valueOf() * Math.random())) + '';
}

UserSchema.methods.encryptPassword = function(password){
        console.log('ENTER  ====> UserSchema.methods.encryptPassword')
        if (!password)
            return '';
        try {
                var result =  crypto1
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
                console.log('**************at encry function ::'+ result);
                return result;
        }
        catch (err) {
            return '';
        }
  
}


// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return next (err);
//     cb(null, isMatch)
//   });
// }
/**
 * Statics
 */

UserSchema.static({
    load: function ( options, cb ){
        console.log('user.js :: user.load');
        options.select = options.select || 'name username';
        console.log('     options.select is' + options.select);
        console.log('     options.criteria is' + JSON.stringify(options.criteria));
        // this.findOne({username :'larry'}, function (err, result_user){
        //     console.log('result_user  :::::::'+ JSON.stringify(result_user));
        // });
        return  this.findOne(options.criteria)
               .select(options.select)
               .exec(cb);
        //console.log('load a user is :: ' + JSON.stringify(result_user));
        
    },
    addFriend:function(){
        
    }

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
