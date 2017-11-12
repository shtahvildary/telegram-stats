var express = require('express');
var router = express.Router();
var user_sc=require("../schema/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Add new user
router.post('/register', function (req, res) {
  console.log('Now U can register a new user...');
  var user = new user_sc(req.body);
  user.save(function (err, result) {
    if (!err) {
      res.json({
        user: result
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
  user_sc.findOne({
    'username': req.body.username,
    'password': req.body.password
  }, function (err, result) {
    if (!err) {
      if (result) {
        res.json({
          user: result
        });
      } else {
        res.status(401).json({
          error: 'unauthorized user'
        })
      }
    } else {
      res.status(500).json({
        error: err
      })
    }
  })
})

//Get all users
router.post('/selectAllUsers', function (req, res) {
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


module.exports = router;
