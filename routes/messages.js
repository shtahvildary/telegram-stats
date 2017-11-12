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
router.post('/select/date', function (req, res) {
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
module.exports = router;