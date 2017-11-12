var mongoose=require('mongoose');

var sc_user = mongoose.Schema({
    username:{type:'string' ,unique : true, required : true},
    password:{type:'string',required:true},
    role:{type:'number', required : true},//0:supperAdmin - 1:admin
    email:{type:'string',unique : true, required : true},
    phoneNumber:{type:["number"]},
    status:{type:'number'}//0:active - 1:deactive - -1:deleted - 3:banned
});
//user collection
module.exports=mongoose.model('user',sc_user);