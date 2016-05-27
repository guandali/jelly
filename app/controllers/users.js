
/*!
 * Module dependencies.
 */

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
    });
    
};

exports.createuser = function (req, res) {
  console.log('users.ts ::==> createuser')
}
