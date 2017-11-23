var mongoose=require('mongoose');

var sc_user = mongoose.Schema({
    username:{type:'string' ,unique : true, required : true},
    password:{type:'string',required:true},
    email:{type:'string',unique : true, required : true},
    phoneNumber:{type:["number"]},
    status:{type:'number',default:0}//0:active - 1:deactive - -1:deleted - 3:banned
});
//user collection
module.exports=mongoose.model('User',sc_user);