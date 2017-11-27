(function ($) {
//Add a new vote item
    $(function () {  
        $("#btnVoteItemsAdd").click(function () {
            var voteItemTitle = $("#voteItemTitle").val();
            var type = $('input[name=voteItemType]:checked').val();
            var description = $("#description").val();
            
            addVoteItem({
                title: voteItemTitle,
                type: type
            });
        });

    }); 
    var addVoteItem = function (voteItem) {
        post('/voteItems/new', voteItem, function (response) {
            if (response.voteItem == false) {
                alert("ثبت اطلاعات با موفقیت همراه نبود. لطفا دوباره سعی کنید")
            } else {
                alert("ثبت اطلاعات با موفقیت انجام شد")
            }
        });
    }

    //show a list of vote items    
        var search_voteItems=function(query){
            
            post('/voteItems/all',{query:query},function(response){
                console.log('search vote items',response)
                $('#voteItems-list').empty();
                response.voteItemsArray.map(function(item){
                $('#voteItems-list').append(`
                    <div class="card">
                    <div class="card-content">
                      
                      <p>`+item.title+`</p>
                      
                    </div>
                    
                  </div>`
                );
              });
            })
        }


        $(function () {
            ////////////////////////////////////
            //TODO: search shoul be completed 
            ////////////////////////////////////
            
            $('#search').keypress(function (e) {
                if (e.which == 13) {
                    var value=$('#search').val();
                    console.log('query',{text:value})
                    search_voteItems(value);
                  return false;    
                }
              });
    
            post('/voteItems/all',{},function(response){
                console.log('all vote items',response)
                response.voteItemsArray.map(function(item){
                $('#voteItems-list').append(`
                    <div class="card">
                    <div class="card-content">
                      
                      <p>`+item.title+`</p>
                      
                    </div>
                    
                  </div>`
                );
              });
            })
        });
})(jQuery); 