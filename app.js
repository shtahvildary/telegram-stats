require('dotenv').config();
var messageDB = require("./Schema/Messages");
const botgram = require("botgram");
var  textAnalyser= require("./textAnalyser");
const db = require("./config/DBConfig");

//var textAnalyser = require('./textAnalyser')("Some Text       Here! به همه دوستان ولی ... سلام");

var bot = botgram("456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE");
bot.command("start", function (msg, reply) {
    //console.log(msg);
    reply.text("سلام، خوش آمدید");
})

bot.text(function (msg, reply) {

    //console.log(msg);
    var AnalyseResult=textAnalyser(msg.text);
    console.log("analyseResult:",AnalyseResult);
    //var keywords=msg.hashtags().concat(AnalyseResult);

    var newMessage = new messageDB({
        type: msg.type,
        chatId: msg.chat.id,
        chatTitle: msg.chat.title,
        message: msg.text,
        //keywords: msg.hashtags()
        keywords: AnalyseResult
    })
    newMessage.save(function(err,savedMessage){
      console.log(err)
      if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      reply.text('پیام شما با موفقیت ارسال شد.');
      
    });
   

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
    newVideo.save(function(err,savedMessage){
        console.log(err)
        if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
        reply.text('پیام شما با موفقیت ارسال شد.');
        
      });
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
    newAudio.save(function(err,savedMessage){
        console.log(err)
        if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
        reply.text('پیام شما با موفقیت ارسال شد.');
        
      });
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
    newVoice.save(function(err,savedMessage){
        console.log(err)
        if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
        reply.text('پیام شما با موفقیت ارسال شد.');
        
      });
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
    newPhoto.save(function(err,savedMessage){
        console.log(err)
        if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
        reply.text('پیام شما با موفقیت ارسال شد.');
        
      });

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
    newDocument.save(function(err,savedMessage){
        console.log(err)
        if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
        reply.text('پیام شما با موفقیت ارسال شد.');
        
      });
    
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
    // newSticker.save(function(err,savedMessage){
    //     console.log(err)
    //     if(err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
    //     reply.text('پیام شما با موفقیت ارسال شد.');
        
    //   });

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
    var link;

    bot.fileGet(msgFile, function (err, info) {
        if (err) throw err;
        console.log(msgFile.type);
        link=bot.fileLink(info);
        console.log("We got the link:", bot.fileLink(info));
      });
      bot.fileLoad(msgFile, function (err, buffer) {
        
        var fileName=link.slice(link.lastIndexOf("/")+1,link.length);
        console.log(link);
        console.log('file name:'+fileName);

        if (err) throw err;
        console.log("Downloaded! Writing to disk...");
        require("fs").writeFile(fileName, buffer);
      });
}