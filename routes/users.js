var express = require('express');
var router = express.Router();
var user_sc = require("../Schema/user");
var auth = require('../tools/authentication');
//var auth=require('../tools/auth');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//Add new user
router.post('/register', auth, function (req, res) {
  console.log('Now U can register a new user...');
  var user = new user_sc(req.body);
  user.save(function (err, result) {
    if (!err) {

      //var token=auth.tokenize(result._id);
      req.session.userId = result._id;
      res.json({
        user: result,
        //token: token
      });
    } else {
      res.json({
        error: err
      })
    };
  });
});

//Login
router.post('/login', function (req, res) {
  // bcrypt.hash(req.body.password, 10, function (err, hash){
  //   if (err) {
  //     res.json({
  //       error: err
  //     });
  //     //return next(err);
  //   }
  //   req.body.password = hash;
  //   //next();
  // })
  user_sc.findOne({
    'username': req.body.username,
    //'password': req.body.password
  }, function (err, result) {
    if (!err) {
      if (result) {

        bcrypt.compare(req.body.password, result.password, function (err, same) {
          if (!same) {
            return res.status(401).json({
              error: 'unauthorized user, pass is not correct',
              auth: false
            })
          }
        //var token=auth.tokenize(result._id);
      req.session.userId=result._id;
      console.log(req.session.cookie)
      console.log(req.session.userId)
        
        res.json({
          user: result,
          cookie:req.session.cookie,
          sName:req.session.name,
          auth:true
        });
        res.end('done');

          //var token=auth.tokenize(result._id);
          req.session.userId = result._id;
          console.log(req.session.cookie)
          console.plain(req.session.userId)

          res.json({
            user: result,
            cookie: req.session.cookie,
            sName: req.session.name,
            auth: true,
          });
          res.end('done');
        })
      } else {
        res.status(401).json({
          error: 'unauthorized user',
          auth: false
        })
      }
    } else {
      res.status(500).json({
        error: err,
        auth: false
      })
    }


  })
})

//Get all users
router.post('/selectAllUsers', auth, function (req, res) {
  user_sc.find({}, function (err, result) {
    if (!err) {
      if (result) {
        res.json({
          usersArray: result
        });
      } else {
        res.json({
          error: 'There is no user to select...'
        });
      }
    } else {
      res.status(500).json({
        error: err
      })
    }
  })
})


// GET /logout
router.post('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
        console.log("Problem in session distroy")
      } else {
        console.log("session is distroied :D")
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;