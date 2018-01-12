var express = require('express');
var router = express.Router();
var votes_sc = require("../Schema/votes");
var voteItem_sc = require("../Schema/voteItems");

var auth = require('../tools/authentication');



//Get all programs and channels (voteItems) which are enable (not deleted)
router.post('/all', auth,function (req, res) {
  votes_sc.find({}, function (err, result) {
    if (!err) {
      if (result) {
        res.json({
          votesArray: result
        });
      } else {
        res.json({
          error: 'There is no Vote...'
        });
      }
    } else {
      res.status(500).json({
        error: err
      })
    }
  })
})


router.post('/all/scores', auth,function (req, res) {
  votes_sc.find({},{vote:1,_id:0},function (err, result) {
    // votes_sc.find({}).populate({ path: 'vote.destinationId', select: 'title' }).exec(function (err, result) {
    if (!err) {
      if (result) {
        // console.log(result[0]._doc.vote)
        res.json({
          votesArray: result
        });

        

      //   votesArray.forEach(function (message) {
      //     msgCounts[message.date.getHours()] += 1;
      // });
        // voteItem_sc.find({'_id':})

      } else {
        res.json({
          error: 'There is no Vote...'
        });
      }
    } else {
      res.status(500).json({
        error: err
      })
    }
  })
})


// //Search voteItems
// router.post('/search', function (req, res) {
//   console.log('query', req.body.query)
//   voteItem_sc.find({
//     "title": {
//       $regex: req.body,
//       $options: 'i'
//     }
//   }).sort('-date').exec(function (err, result) {
//     if (!err) {
//       res.status(200).json({
//         voteItems: result
//       });
//     } else {
//       res.status(500).json({
//         error: err
//       });
//     }
//   })
// })

module.exports = router;