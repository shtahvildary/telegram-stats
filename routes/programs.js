var express = require('express');
var router = express.Router();
var program_sc=require("../Schema/programs");


//Add new program
router.post('/new', function (req, res) {
  console.log('Now U can save a new program...');
  var program = new program_sc(req.body);
  console.log(req.body);
  program.save(function (err, result) {
    
    if (!err) {

      res.json({
        program: result  
      });
    } else {

      res.json({
        error: err
      })
    };
  });
});

//Get all programs
router.post('/all', function (req, res) {
  user_sc.find({}, function (err, result) {
    if (!err) {
      if (result) {
        res.json({
          programsArray: result
        });
      } else {
        res.json({
          error: 'There is no program to select...'
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
