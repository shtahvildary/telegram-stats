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
    var newVideo = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,

        fileId: msg.file.id,
        mime: msg.file.mime,
        VideoCaption: msg.caption

    });
    newVideo.save();
    download(msg.file);
    
})

bot.audio(function (msg, reply, next) {
    var newAudio = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,

        fileId: msg.file.id,
        mime: msg.file.mime,
        AudioTitle: msg.title

    });
    newAudio.save();
    download(msg.file);
    
})
bot.voice(function (msg, reply, next) {
    var newVoice = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,

        fileId: msg.file.id,
        mime: msg.file.mime

    });
    newVoice.save();
    download(msg.file);
})
//bot.contact(function (msg, reply, next) {
//
//})
bot.photo(function (msg, reply, next) {
    var newPhoto = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,

        //image:msg.image,
        caption: msg.caption
    });
    newPhoto.save();

    download(msg.file);
    

})
bot.document(function (msg, reply, next) {
    var newDocument = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,

        fileId: msg.file.id,
        mime: msg.file.mime,
        fileName: msg.filename

    });
    newDocument.save();
    
    download(msg.file);    
})

bot.sticker(function (msg, reply, next) {
    var newSticker = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,

        fileId: msg.file.id,

        emoji: msg.emoji

    });
    newSticker.save();

})
// bot.videoNote(function (msg, reply, next) {
//     var newVideoNote = new messageDB({
//         type: msg.type,
//         chatId: msg.chat.id,
//         chatTitle: msg.chat.title,

//         fileId: msg.file.id,
//     });
//     newVideoNote.save();
// })
function download(msgFile){
    bot.fileGet(msgFile, function (err, info) {
        if (err) throw err;
        console.log("We got the link:", bot.fileLink(info));
      });
      bot.fileLoad(msgFile, function (err, buffer) {
        if (err) throw err;
        console.log("Downloaded! Writing to disk...");
        require("fs").writeFile("voice.ogg", buffer);
      });
}