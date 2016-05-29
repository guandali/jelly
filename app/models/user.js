
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  username: {type: String, default:''},
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

UserSchema.pre('save', function (next) {
  var user = this;
  
  if(!user.isModified('')) return next;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if(err) return next (err);
    
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err)
      user.password = hash;
      next();
    });
  });
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
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return next (err);
    cb(null, isMatch)
  });
}
/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
