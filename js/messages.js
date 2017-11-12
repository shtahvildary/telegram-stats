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
                  
                </div>
                
              </div>`
            );
          });
        })
    });
})(jQuery);