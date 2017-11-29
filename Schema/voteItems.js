const mongoose=require("mongoose");

var voteItemSchema=mongoose.Schema({
    title:String,    
    type:Number,//0:channel , 1:program  
    description:String,
    
    
    //channels
    channelId:String,

    //programs
    personnels:[{type:String}],
});
module.exports=mongoose.model("voteItems",voteItemSchema);
