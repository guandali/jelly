
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Welcome to jelly Butter project'
  });
};
