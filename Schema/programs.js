const mongoose=require("mongoose");

var programSchema=mongoose.Schema({
    title:String,
    personnels:[{type:String}],
    description:String

});
module.exports=mongoose.model("programs",programSchema);
