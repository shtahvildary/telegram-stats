var express = require('express');
var router = express.Router();
var message_sc = require("../schema/messages");

//select all sort by date
router.post('/select/all/date', function (req, res) {
    message_sc.find({}).sort('-date').exec(function (err, result) {
        //pagination should be handled
        if (!err) {
            res.status(200).json({
                messages: result
            });
        } else {
            res.status(500).json({
                error: err
            });
        }
    })
})

//date.gethours
router.post('/chart/daily', function (req, res) {
    console.log(req.body);
    var h0=new Date(req.body.date);
    var h24=new Date(req.body.date);
    console.log(h0);
    h0.setHours(0,0,0,0);
    h24.setHours(23,59,59,999);
    
    message_sc.find({'date':{$gt:h0},'date':{$lt:h24}}).exec(function (err, result) {
        //pagination should be handled
        if (!err) {
            
            var msgCounts=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            // console.log(msgCounts.length)
            
            
            result.forEach(function(message){
                msgCounts[message.date.getHours()]+=1;
            });
            res.status(200).json({text:msgCounts})
        } else {
            res.status(500).json({
                error: err
            });
        }
    })
})
module.exports = router;