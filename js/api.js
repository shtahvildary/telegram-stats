(function ($) {
    $(function () {
        

    }); // end of document ready
})(jQuery); // end of jQuery name space

var post = function (endpoint, data,callback) {
    $
        .ajax({
            method: "POST",
            url: "localhost:5001" +endpoint,
            data: data
        })
        .done(function (msg) {
            callback(msg)
        });
}