var express = require('express');
var router = express.Router();
var voteItem_sc=require("../Schema/voteItems");


//Add new program or channel
router.post('/new', function (req, res) {
  console.log('Now U can save a new program or channel (voteItems)...');
  var voteItem = new voteItem_sc(req.body);
  console.log(req.body);
  voteItem.save(function (err, result) {
    
    if (!err) {

      res.json({
        voteItem: result  
      });
    } else {

      res.json({
        error: err
      })
    };
  });
});

//Get all programs and channels (voteItems)
router.post('/all', function (req, res) {
  voteItem_sc.find({}, function (err, result) {
    if (!err) {
      if (result) {
        res.json({
          voteItemsArray: result
        });
      } else {
        res.json({
          error: 'There is no cannel or program to select...'
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
