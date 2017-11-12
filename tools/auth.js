var a={};
var bcrypt=require('bcrypt-nodejs');
var consts=require('../config/consts');
var User=require('../Schema/users');
a.tokenize=function(user_id){
    var token = jwt.sign({ id: user_id }, config.secret, { expiresIn: 604000 })
    return token;
}
a.checkToken=function(req,res,next){
    var token=req.header('x-access-token');
    jwt.verify(token, config.secret, function (err, decoded) {
        if(err) return res.status(500).json({error:err,auth:false});
        User.findOne({_id:decoded},function(err,foundUser){
            if(err) return res.status(401).json({error:err,auth:false});
            if(!foundUser) return res.status(401).json({error:'Unknown token',auth:false});
            req.user=foundUser;
            next();
        });
    });
}

module.exports=a;