(function ($) {

    var search_message = function (query) {

        post('/messages/search', {
            query: query
        }, function (response) {
            console.log('search messages', response)
            $('#messages-list').empty();
            response.messages.map(function (item) {
                $('#messages-list').append(`
                <div class="card">
                <div class="card-content">
                
                  <p>` + item.message + `</p>
                  <p>` + item.date + `</p>
                  <a class="waves-effect waves-light btn modal-trigger reply" id="btnReply-` + item._id + `" href="#replyModal">پاسخ
                  <i class="material-icons">reply</i></a>
                  
                  
                </div>
                
                
              </div>`);
            });
        })
    }
    $(function () {

        $('#search').keypress(function (e) {
            if (e.which == 13) {
                var value = $('#search').val();
                console.log('query', {
                    text: value
                })
                search_message(value);
                return false; //<---- Add this line
            }
        });

        post('/messages/select/all/date', {}, function (response) {
            console.log('all messages', response)
            var reply;
            response.messages.map(function (item) {

                $('#messages-list').append(`
                <div class="card">
                <div class="card-content">
                  
                  <p>` + item.message + `</p>
                  <p>` + item.date + `</p>
                  <a class="waves-effect waves-light btn modal-trigger reply" id="btnReply-` + item._id + `" chatId="` + item.chatId + `" msgId="` + item._id + `" href="#replyModal">پاسخ
                  <i class="material-icons">reply</i></a>
                  
                </div>
                
              </div>`);
            });
            $('.reply').click(function (e) {
                console.log('btn reply is clicked');
                reply = {
                    
                    msgId: $(this).attr('msgId'),
                    //chatId: $(this).attr('chatId'),
                    text: "",
                    ////////////////////////////////////////////////////////////////////
                    // userId= .... CORRECT IT AS SOON AS POSSIBLE
                    ////////////////////////////////////////////////////////////////////
                    userId: "5a16a4406fd1520f97e7ae86"

                }
                //console.log($(this).attr('replyItem'));

                $('#messages-list').after(`
        
        <!-- Modal Trigger -->
        <div id="replyModal" class="modal reply">
            <div class="modal-content">
                <h5>پاسخ</h5>
                <p>
                        <form>
                        <div class="row">
          
                            <div class="row">
                            <div class="input-field col s12">
                                <textarea id="replyTxt" type="text" class="materialize-textarea"></textarea>
                                <label class="active" for="description">پاسخ</label>
                            </div>
                            </div>
                            
                        </form>
        
                        <div class="modal-footer">
                            <button class="btn waves-effect waves-light" id="btnSendReply">ارسال
                               <i class="material-icons right">send</i>
                            </button>
                            <button class="btn waves-effect waves-light modal-close">انصراف
                               <i class="material-icons right">cancel</i>
                            </button>
                        </div>
                    </div>
                </p>
            </div>
        </div>
        `);
                $('.reply').modal();


                $('#btnSendReply').click(function (e) {

                    // reply.msgId= $(this).attr("msgId");
                    // reply.chatId= $(this).attr('chatId');
                    //reply.text = "jkjljljasga";
                    
                    reply.text = $('#replyTxt').val();
                    ////////////////////////////////////////////////////////////////////
                    // userId= .... CORRECT IT AS SOON AS POSSIBLE
                    ////////////////////////////////////////////////////////////////////

                    console.log('reply:', reply)

                    if (replyToMsg(reply)) {
                        // if (status==true) {
                        $('#replyModal').modal('close');
                        alert("ارسال پیام با موفقیت انجام شد.");
                    } else {
                        alert("پیام شما ارسال نشدء لطفا دوباره اقدام نمایید. کدخطا: " + status)
                    }
                })
            })
        })

        function replyToMsg(reply) {
            console.log('replyToMsg: ', reply);

            post('/messages/reply', JASON.stringify({
                _id: reply.msgId,
                // chatId: reply.chatId,
                replys: {
                    text: reply.text,
                    userId: reply.userId
                }
            }), function (response) {
                console.log('message which U replied:', response);

            })
        }


    });
})(jQuery);