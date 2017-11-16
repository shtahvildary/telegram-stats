const mongoose=require("mongoose");

var messageSchema=mongoose.Schema({
    chatId:String,
    chatType:String,
    chatTiltle:String,
    type:String,
    message:String,
    date:{type:Date,default:Date.now},
    keywords:[{word:String,count:Number}],
    //video,Audio,voice,photo,document,sticker,videoNote
    fileId:String,
    mime:String,
    //video,photo
    caption:String,
    //Audio
    audioTitle:String,
    
    //photo
    //image:TYPE?????

    //document
    fileName:String,

    //emoji
    emoji:String

    


})


module.exports=mongoose.model("messages",messageSchema);