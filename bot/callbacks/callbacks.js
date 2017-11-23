var bot;
var reqHandler=require("../../tools/reqHandler");
var votesDB=require("../../Schema/votes")


//types:      0:mainMenueKeys   ,   1:voteItemKeys(progK)   ,   2:scoreKeys

///////////////////////////////////////////////////////
//TODO: these variables should be filled automaticly:
var scoreCount=5;
var channelId="-1001235865196";//WordCloud ChannelId
///////////////////////////////////////////////////////

module.exports = function (mainBot) {
    bot = mainBot;
    //callback for mainMenueKeys
    bot.callback(function (query, next) {
        var data;
        try {
            data = JSON.parse(query.data);
        } catch (e) {
            return next();
        }
        if (data.type !== 0)
            return next();
        if (data.action == "channelVoting") {
            keyboards.fillScoreKeys(scoreCount,channelId,function(generatedKeys){
                reqHandler("sendMessage", {
                    text: "به کانال تلگرامی ما از ۱ تا ۵ چه امتیازی می دهید؟",
                    chat_id: query.from.id,
                    reply_markup: {
                        inline_keyboard: generatedKeys
                    }
                }, function (body) {});
            })
        } else if (data.action == "programsVoting") {
            keyboards.fillVoteItems(function(generatedKeys){
                console.log(generatedKeys)
                reqHandler("sendMessage", {
                    text: "لطفا برنامه مورد نظر خود را انتخاب نمایید.",
                    chat_id: query.from.id,
                    reply_markup: {
                        inline_keyboard: generatedKeys
                    }
                }, function (body) {})
            });   
        }
    });

    bot.callback(function (query, next) {
        var data;
        try {
            data = JSON.parse(query.data);
        } catch (e) {
            return next()
        }
        if (data.type !== 1) {
            return next();
        } else {
            keyboards.fillScoreKeys(scoreCount,data.voteItemId,function(generatedKeys){

                console.log(data);
                reqHandler("sendMessage", {
                    text: "به برنامه" + data.voteItemId + " از ۱ تا ۵ چه امتیازی می دهید؟",
                    chat_id: query.from.id,
                    
                    reply_markup: {
                        inline_keyboard: generatedKeys
                    }
                }, function (body) {})
            })
        }
    })

    //callback for scoreKeys
    bot.callback(function (query, next) {
        var data;
        try {
            data = JSON.parse(query.data);
        } catch (e) {
            return next();
        }
        if (data.type !== 2)
            return next();
        else {
            //console.log("data for voting:" + data)

            var newVote = new votesDB({
                chatId: query.from.id,
                //type: String, //channel or program voting
                vote: {
                    destinationId: data.voteItemId, //channelId or voteItemId
                    score: data.score
                }
            })

            newVote.save(function (err, savedVote) {
                console.log(err)

                if (err) //return reply.text('نظر شما ثبت نشد. لطفا دوباره سعی کنید.');
                {
            keyboards.fillScoreKeys(scoreCount,data.voteItemId,function(generatedKeys){
                
                    reqHandler("sendMessage", {
                        text: 'نظر شما ثبت نشد. لطفا دوباره سعی کنید.',
                        chat_id: query.from.id,
                        reply_markup: {
                            inline_keyboard: keyboards.scoreKeys
                        }
                    }, function (body) {});
                })
                }
                else {
                    //reply.text('نظر شما با موفقیت ارسال شد.');
                    reqHandler("sendMessage", {
                        text: 'نظر شما با موفقیت ثبت شد.',
                        chat_id: query.from.id,
                    }, function (body) {});
                    //console.log(savedVote);
                }
            });
        }
    });
    //callback for progK
    bot.callback(function (query, next) {
        var data;
        try {
            data = JSON.parse(query.data);
        } catch (e) {
            return next();
        }
        if (data.type !== 2)
            return next();
        //   switch(data.score){
        //     case "1":

        // }
        else {
            var newVote = new votesDB({
                chatId: query.from.id,
                //type: String, //channel or program voting
                vote: {
                    destinationId: data.voteItemId,
                    score: data.score
                }
            })
            newVote.save(function (err, savedVote) {
                console.log(err)

                if (err) //return reply.text('نظر شما ثبت نشد. لطفا دوباره سعی کنید.');
                    reqHandler("sendMessage", {
                        text: 'نظر شما ثبت نشد. لطفا دوباره سعی کنید.',
                        chat_id: query.from.id,
                        reply_markup: {
                            inline_keyboard: scoreKeys
                        }
                    }, function (body) {});
                else {
                    //reply.text('نظر شما با موفقیت ارسال شد.');
                    reqHandler("sendMessage", {
                        text: 'نظر شما با موفقیت ثبت شد.',
                        chat_id: query.from.id,
                    }, function (body) {});
                    //console.log(savedVote);
                }
            });
        }
    });
}