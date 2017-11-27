(function ($) {

    $(function () {
        console.log('test')
        $("#btnVoteItemsAdd").click(function () {
            var voteItemTitle = $("#voteItemTitle").val();
            var type = $("#voteItemType").val();
            var description = $("#description").val();
            console.log(voteItemTitle, type, description);
            addVoteItem({
                title: voteItemTitle,
                type: 0
            });
        });

    }); // end of document ready
    var addVoteItem = function (voteItem) {
        post('/voteItems/new', voteItem, function (response) {
            if (response.voteItem == false) {
                alert("ثبت اطلاعات با موفقیت همراه نبود. لطفا دوباره سعی کنید")
            } else {
                alert("ثبت اطلاعات با موفقیت انجام شد")
            }
        });
    }
})(jQuery); // end of jQuery name space