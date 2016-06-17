
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Welcome to jelly Butter project'
  });
};


exports.search = function (req, res) {
  res.render('searchbar');
}
