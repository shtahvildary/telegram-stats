const mongoose=require("mongoose");

var messageSchema=mongoose.Schema({
    chatId:String,
    chatTiltle:String,
    type:String,
    message:String,
    date:{type:Date,default:Date.now},
    keywords:[String]
})


module.exports=mongoose.model("messages",messageSchema);