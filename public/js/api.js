(function ($) {
    $(function () {
        

    }); // end of document ready
})(jQuery); // end of jQuery name space

var post = function (endpoint, data,callback) {
    $
        .ajax({
            method: "POST",
            // url: "http://172.16.17.149:5001" +endpoint,
            url: "http://192.168.1.5:5001" +endpoint,
//            url: "http://178.33.79.204:5001" +endpoint,
            data: data,
            headers:{'x-access-token':$.cookie("token")}
        })
        .done(function (msg) {
            console.log(msg)
            callback(msg)
        });
}
