const mongoose=require("mongoose");

var programSchema=mongoose.Schema({
    title:String,
    personnels:[{type:String}]

});
module.exports=mongoose.model("programs",programSchema);
