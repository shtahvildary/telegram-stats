(function ($) {
    
    console.log('hey')
    $(function () {
        post('/messages/select/last/date',{},function(response){
            console.log('last messages',response)
            response.messages.map(function(item){
            $('#last-messages').append(`<li class="collection-item">
            
            <p>`+item.message+`</p>
            
          </li>`);
          });
        })
    });
})(jQuery);