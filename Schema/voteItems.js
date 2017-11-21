const mongoose=require("mongoose");

var voteItemSchema=mongoose.Schema({
    title:String,    
    type:Number,//0:channel , 1:program    
    //programs
    personnels:[{type:String}],
    description:String
});
module.exports=mongoose.model("voteItems",voteItemSchema);
