
/**
 * Expose
 */

module.exports = {
  //db: 'mongodb://thebuzzers:cs310project@ds059145.mongolab.com:59145/comicbuzzdb',
  db: 'mongodb://coliguanda:ac030_Yvr@ds021663.mlab.com:21663/nodeproject1',
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
