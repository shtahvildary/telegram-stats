(function ($) {
    $(function () {
        var post = function (endpoint, data) {
            $
                .ajax({
                    method: "POST",
                    url: "localhost:3000" +endpoint,
                    data: data
                })
                .done(function (msg) {
                    console.log("Data Saved: " + msg);
                });
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space