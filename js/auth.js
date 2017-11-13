(function ($) {
    $(function () {
        
        
    }); // end of document ready
    var register=function(user){
        post('/users/register',user,function(response){
            if(response.auth==false){
                alert("ثبت نام با موفقیت همراه نبود. لطفا دوباره سعی کنید")
            }
            else{
                $.cookie("token", response.token);
            }
        });
    }
    var login=function(auth){
        post('/users/login',auth,function(response){
            if(response.auth==false){
                alert("عملیات ورود با موفقیت همراه نبود. لطفا دوباره سعی کنید.")
            }
            else{
                $.cookie("token", response.token);
            }
        });
    }
})(jQuery); // end of jQuery name space