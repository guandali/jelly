
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  console.log('@ home.js   req.body:'+ JSON.stringify(req.body));
  console.log('@ home.js   req.session:'+ JSON.stringify(req.session));
  console.log('@ home.js   req.user:'+ JSON.stringify(req.user));
  res.render('home/index', {
    title: 'Welcome to jelly Butter project'
  });
};


exports.search = function (req, res) {
  res.render('searchbar');
}
