function requiresLogin(req, res, next) {
  userId=req.body.token;
    if (req.session.userId) {
      // if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
    }
  }
  //router.get('/profile', mid.requiresLogin, function(req, res, next) {
    //...
//   });
module.exports=requiresLogin;