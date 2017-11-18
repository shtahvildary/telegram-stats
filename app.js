require('dotenv').config();
var messageDB = require("./Schema/Messages");
var programsDB = require("./Schema/programs");
var votesDB = require("./Schema/votes");
const botgram = require("botgram");
var textAnalyser = require("./textAnalyser");
const db = require("./config/DBConfig");
var reqHandler = require("./reqHandler");

//var textAnalyser = require('./textAnalyser')("Some Text       Here! به همه دوستان ولی ... سلام");
var mainMenueKeys = [
  [{
      text: "ثبت نظر درمورد کانال",
      callback_data: JSON.stringify({
        type: "mainMenueKeys",
        action: "channelVoting"
      })
    },
    {
      text: "ثبت نظر درمورد برنامه ها",
      callback_data: JSON.stringify({
        type: "mainMenueKeys",
        action: "programsVoting"
      })
    }
  ]
];
//////////////////////////////////////////////////////
//todo: programs names should be read from programsDB:
var programs=programsDB.find();
var programsKeys = [
  [{
    text: "دکتر سلام"
  }, {
    text: "پرسشگر"
  }]
];

var scoreKeys = [
  [{
    text: "1",
    callback_data: JSON.stringify({
      type: "scoreKeys",
      score: "1"
    })
  }, {
    text: "2",
    callback_data: JSON.stringify({
      type: "scoreKeys",
      score: "2"
    })
  }, {
    text: "3",
    callback_data: JSON.stringify({
      type: "scoreKeys",
      score: "3"
    })
  }, {
    text: "4",
    callback_data: JSON.stringify({
      type: "scoreKeys",
      score: "4"
    })
  }, {
    text: "5",
    callback_data: JSON.stringify({
      type: "scoreKeys",
      score: "5"
    })
  }]
]
//shmt_bot
var bot = botgram("449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk");
//admin it
//var bot = botgram("456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE");

bot.command("start", function (msg, reply) {
  //console.log(msg);
  reply.inlineKeyboard(mainMenueKeys).text("سلام، خوش آمدید. پیشاپیش از شما که از این طریق  با ما در ارتباطید  و نظرات خود را در مورد برنامه های مختلف شبکه و نیز کانال تلگرامی شبکه با ما در میان می گذارید متشکریم.");


})

bot.callback(function (query, next) {
  var data;
  try {
    data = JSON.parse(query.data);
  } catch (e) {
    return next();
  }
  if (data.type !== "mainMenueKeys")
    return next();
  if (data.action == "channelVoting") {
    // query.answer({
    //   text: "show scoreKeys"
    // });
    reqHandler("sendMessage", {
      text: "به کانال تلگرامی ما از ۱ تا ۵ چه امتیازی می دهید؟",
      chat_id: query.from.id,
      reply_markup: {
        inline_keyboard: scoreKeys
      }
    }, function (body) {});
  }
});
bot.callback(function (query, next) {
  var data;
  try {
    data = JSON.parse(query.data);
  } catch (e) {
    return next();
  }
  if (data.type !== "scoreKeys")
    return next();
  //   switch(data.score){
  //     case "1":

  // }
  else {
    var newVote = new votesDB({
      chatId: query.from.id,
      //type: String, //channel or program voting
      vote: {
        //destinationId: String, //channelId or programId
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

bot.text(function (msg, reply, next) {
  var AnalyseResult = textAnalyser(msg.text);
  console.log("analyseResult:", AnalyseResult);
  //var keywords=msg.hashtags().concat(AnalyseResult);

  var newMessage = new messageDB({
    type: msg.type,
    chatId: msg.chat.id,
    chatType: msg.chat.type,
    chatTitle: msg.chat.title,
    message: msg.text,
    //keywords: msg.hashtags()
    keywords: AnalyseResult
  })
  newMessage.save(function (err, savedMessage) {
    console.log(err)
    if (newMessage.chatType == "user") {
      if (err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      else {
        reply.text('پیام شما با موفقیت ارسال شد.')
      }
    }

  });
  var keys = [
    [{
        text: "1",

      },
      {
        text: "2",

      }, {
        text: '3'
      }
    ],
    [{
      text: '4'
    }]
  ];
  reply.keyboard(keys, true)
})
bot.video(function (msg, reply, next) {
  var newVideo = new messageDB({
    type: msg.type,
    chatId: msg.chat.id,
    chatType: msg.chat.type,
    chatTitle: msg.chat.title,

    fileId: msg.file.id,
    mime: msg.file.mime,
    VideoCaption: msg.caption

  });
  newVideo.save(function (err, savedMessage) {
    console.log(err)
    if (newVideo.chatType == "user") {

      if (err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      reply.text('پیام شما با موفقیت ارسال شد.');
    }

  });
  download(msg.file);

})

bot.audio(function (msg, reply, next) {
  var newAudio = new messageDB({
    type: msg.type,
    chatType: msg.chat.type,
    chatId: msg.chat.id,
    chatTitle: msg.chat.title,

    fileId: msg.file.id,
    mime: msg.file.mime,
    AudioTitle: msg.title

  });
  newAudio.save(function (err, savedMessage) {
    console.log(err);
    if (newAudio.chatType == "user") {

      if (err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      reply.text('پیام شما با موفقیت ارسال شد.');
    }

  });

  download(msg.file);

})
bot.voice(function (msg, reply, next) {
  var newVoice = new messageDB({
    type: msg.type,
    chatId: msg.chat.id,
    chatType: msg.chat.type,
    chatTitle: msg.chat.title,

    fileId: msg.file.id,
    mime: msg.file.mime

  });
  newVoice.save(function (err, savedMessage) {
    console.log(err)
    if (newVoice.chatType == "user") {

      if (err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      reply.text('پیام شما با موفقیت ارسال شد.');
    }
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
    chatType: msg.chat.type,
    chatTitle: msg.chat.title,

    //image:msg.image,
    caption: msg.caption
  });
  newPhoto.save(function (err, savedMessage) {
    console.log(err)
    if (newPhoto.chatType == "user") {

      if (err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      reply.text('پیام شما با موفقیت ارسال شد.');
    }

  });

  // download(msg.file);


})
bot.document(function (msg, reply, next) {
  var newDocument = new messageDB({
    type: msg.type,
    chatId: msg.chat.id,
    chatType: msg.chat.type,
    chatTitle: msg.chat.title,

    fileId: msg.file.id,
    mime: msg.file.mime,
    fileName: msg.filename

  });
  newDocument.save(function (err, savedMessage) {
    console.log(err);
    if (newDocument.chatType == "user") {

      if (err) return reply.text('پیام شما ثبت نشد. لطفا دوباره سعی کنید.');
      reply.text('پیام شما با موفقیت ارسال شد.');
    }
  });

  download(msg.file);
})

bot.sticker(function (msg, reply, next) {
  var newSticker = new messageDB({
    type: msg.type,
    chatId: msg.chat.id,
    chatType: msg.chat.type,
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
function download(msgFile) {
  var link;

  bot.fileGet(msgFile, function (err, info) {
    if (err) throw err;
    console.log(msgFile.type);
    link = bot.fileLink(info);
    console.log("We got the link:", bot.fileLink(info));
  });
  bot.fileLoad(msgFile, function (err, buffer) {

    var fileName = link.slice(link.lastIndexOf("/") + 1, link.length);
    console.log(link);
    console.log('file name:' + fileName);

    if (err) throw err;
    console.log("Downloaded! Writing to disk...");
    require("fs").writeFile(fileName, buffer);
  });
}