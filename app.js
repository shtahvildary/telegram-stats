var messageDB = require("./Schema/Messages");
const botgram = require("botgram");
const db = require("./config/DBConfig");

var textAnalyser = require('./textAnalyser')("Some Text       Here! به همه دوستان ولی ... سلام");

var bot = botgram("456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE");
bot.command("start", function (msg, reply) {
    console.log(msg);
    reply.text("salammmmm");
})

bot.text(function (msg, reply) {

    console.log(msg);
    var newMessage = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,
        message: msg.text,
        keywords: msg.hashtags()
    })
    newMessage.save();
    //reply.text("salammmmm");
})
bot.video(function (msg, reply, next) {

})
bot.audio(function (msg, reply, next) {

})
bot.voice(function (msg, reply, next) {

})
bot.contact(function (msg, reply, next) {

})
bot.image(function (msg, reply, next) {

})
bot.document(function (msg, reply, next) {

})
bot.photo(function (msg, reply, next) {

})
bot.sticker(function(msg,reply,next){
    
    })
    bot.video(function(msg,reply,next){
        
        })