var express = require('express');
var router = express.Router();
var message_sc = require("../Schema/messages");
var moment=require('moment');
var auth=require('../tools/auth');

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

//select all sort by date
router.post('/search',  function (req, res) {
    
    console.log('query',req.body)
    message_sc.find({ "message" : { $regex: req.body.query, $options: 'i' } }).sort('-date').exec(function (err, result) {
        console.log(err)
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

//select all sort by date
router.post('/select/last/date', function (req, res) {
    message_sc.find({}).sort('-date').limit(5).exec(function (err, result) {
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
router.post('/chart/weekly', function (req, res) {
    console.log('weekly',req.body);
    var today=new Date(req.body.date);
    var sat=new Date(req.body.date);
    var fri=new Date(req.body.date);
    var curr = new Date; // get current date
    var first = today.getDate() - today.getDay()-1; // First day is the day of the month - the day of the week
    var last = first + 5; // last day is the first day + 6
    console.log(first,last)

    var firstday = new Date(today.setDate(first));
    var lastday = new Date(today.setDate(last));
    // sat=new Date(today.getFullYear(),today.getMonth,)
    // if(sat.getDay)
    firstday.setHours(0,0,0,0);
    lastday.setHours(23,59,59,999);
    
    message_sc.find({'date':{$gt:firstday},'date':{$lt:lastday}}).exec(function (err, result) {
        //pagination should be handled
        if (!err) {
            
            var msgCounts=[0,0,0,0,0,0,0];
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
router.post('/chart/monthly', function (req, res) {
    console.log('monthly',req.body);
    var today=new Date(req.body.date);
    var sat=new Date(req.body.date);
    var fri=new Date(req.body.date);
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay()-1; // First day is the day of the month - the day of the week
    var last = first + 5; // last day is the first day + 6
    console.log(first,last)

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    // sat=new Date(today.getFullYear(),today.getMonth,)
    // if(sat.getDay)
    firstday.setHours(0,0,0,0);
    lastday.setHours(23,59,59,999);
    
    message_sc.find({'date':{$gt:firstday},'date':{$lt:lastday}}).exec(function (err, result) {
        //pagination should be handled
        if (!err) {
            
            var msgCounts=[0,0,0,0,0,0,0];
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