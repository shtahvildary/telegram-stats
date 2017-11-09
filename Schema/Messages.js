const mongoose=require("mongoose");

var messageSchema=mongoose.Schema({
    chatId:String,
    message:String,
    date:{type:Date,default:Date.now}
})
module.exports=mongoose.model("messages",messageSchema);