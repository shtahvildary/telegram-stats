(function ($) {
    $(function () {
        

    }); // end of document ready
})(jQuery); // end of jQuery name space

var post = function (endpoint, data,callback) {
    $
        .ajax({
            method: "POST",
            url: "http://178.33.79.204:5001" +endpoint,
            data: data
        })
        .done(function (msg) {
            console.log(msg)
            callback(msg)
        });
}
