
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
//var bcrypt = require('bcrypt');
//var SALT_WORK_FACTOR = 10;
var crypto1 = require('crypto');
var Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '' },
  username: {type: String, default:''},
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

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

// UserSchema.method({
  

// });
//  UserSchema.methods.skipValidation = function(){
//    cb(true);
  
//  },
// UserSchema.methods = {
  
//     skipValidation: function () {
//         return true;
//     },
//     authenticate: function (plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },
//     /**
//      * Make salt
//      *
//      * @return {String}
//      * @api public
//      */
//     makeSalt: function () {
//         return Math.round((new Date().valueOf() * Math.random())) + '';
//     },
//     /**
//      * Encrypt password
//      *
//      * @param {String} password
//      * @return {String}
//      * @api public
//      */
//     encryptPassword: function (password) {
//         if (!password)
//             return '';
//         try {
//             return crypto1
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         }
//         catch (err) {
//             return '';
//         }
  
  
// },
// UserSchema.methods.skipValidation = function(){
//   return true;
// }
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

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
