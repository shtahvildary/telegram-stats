var messageDB=require("./Schema/Messages");
const botgram=require("botgram");
const db=require("./config/DBConfig");

var textAnalyser=require('./textAnalyser')("Some Text Here");

var bot=botgram("456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE");
bot.command("start",function(msg,reply){
    console.log(msg);
    reply.text("salammmmm");
})

bot.text(function(msg,reply){

    console.log(msg);
    var newMessage=new messageDB({
        chatId:msg.chat.id,
        message:msg.text
    })
    newMessage.save();
    //reply.text("salammmmm");
})