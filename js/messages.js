(function ($) {
    
    var search_message=function(query){
        
        post('/messages/search',{query:query},function(response){
            console.log('search messages',response)
            $('#messages-list').empty();
            response.messages.map(function(item){
            $('#messages-list').append(`
                <div class="card">
                <div class="card-content">
                
                  <p>`+item.message+`</p>
                  <p>`+item.date+`</p>
                  <a class="waves-effect waves-light btn modal-trigger reply" id="btnReply-` + item._id + `" href="#replyModal">پاسخ
                  <i class="material-icons">reply</i></a>
                  
                  
                </div>
                
                
              </div>`
            );
          });
        })
    }
    $(function () {
        
        $('#search').keypress(function (e) {
            if (e.which == 13) {
                var value=$('#search').val();
                console.log('query',{text:value})
              search_message(value);
              return false;    //<---- Add this line
            }
          });

        post('/messages/select/all/date',{},function(response){
            console.log('all messages',response)
            response.messages.map(function(item){
            $('#messages-list').append(`
                <div class="card">
                <div class="card-content">
                  
                  <p>`+item.message+`</p>
                  <p>`+item.date+`</p>
                  <a class="waves-effect waves-light btn modal-trigger reply" id="btnReply-` + item._id + `" href="#replyModal">پاسخ
                  <i class="material-icons">reply</i></a>
                  
                </div>
                
              </div>`
            );
          });
          $('.reply').click(function (e) {
            console.log('btn reply is clicked');
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
                                <textarea id="reply" type="text" class="materialize-textarea"></textarea>
                                <label class="active" for="description">پاسخ</label>
                            </div>
                            </div>
                            
                        </form>
        
                        <div class="modal-footer">
                            <button class="btn waves-effect waves-light" id="btnVoteItemsUpdate">ثبت
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
        })
        })
    });
})(jQuery);