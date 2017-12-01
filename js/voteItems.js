(function ($) {
    //Add a new vote item
    $(function () {
        $("#btnVoteItemsAdd").click(function () {
            var voteItemTitle = $("#voteItemTitle").val();
            var type = $('input[name=voteItemType]:checked').val();
            var description = $("#description").val();

            addVoteItem({
                title: voteItemTitle,
                type: type,
                description
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
    var search_voteItems = function (query) {

        post('/voteItems/all', {
            query: query
        }, function (response) {
            console.log('search vote items', response)
            $('#voteItems-list').empty();
            response.voteItemsArray.map(function (item) {
                $('#voteItems-list').append(`
                    <div class="card">
                    <div class="card-content">     
                    <p>` + item.title + `</p>
                    </div>
                    
                  </div>`);
            });
        })
    }


    $(function () {
        ////////////////////////////////////
        //TODO: search should be completed 
        ////////////////////////////////////

        $('#search').keypress(function (e) {
            if (e.which == 13) {
                var value = $('#search').val();
                console.log('query', {
                    text: value
                })
                search_voteItems(value);
                return false;
            }
        });

        post('/voteItems/all', {}, function (response) {
            console.log('all vote items', response)
            response.voteItemsArray.map(function (item) {
                $('#voteItems-list').append(`
                    <div class="card" unqueId=` + item._id + `>
                    <div class="card-content">
                      
                    <p>` + item.title + `</p>
                      <p>` + item.description + `</p>
                      <p>` + item.personnels + `</p>

                      <!-- Modal Trigger -->
                      
                      <a class="waves-effect waves-light btn modal-trigger edit" id="btnEdit" href="#editModal">ویرایش
                      <i class="material-icons">edit</i></a>

                      <div id="editModal" class="modal edit">
                      <div class="modal-content">
                        <h5>ویرایش</h5>
                        <p>

                        <div class="row">
                                        <form>
                                            <div class="input-field col s12">
                                                <input id="voteItemTitle" type="text" class="validate" value="`+item.title+`">
                                                <label for="voteItemTitle">عنوان</label>
                                            </div>
                                            <div class="input-field col s12">
                                                <textarea id="description" class="materialize-textarea" value="`+item.description+`"></textarea>
                                                <label for="description">توضیحات</label>
                                            </div>
                                        </form>
                        
                                        <div class="modal-footer">
                                        <button class="btn waves-effect waves-light" type="submit" id="btnVoteItemsAdd">ثبت
                                            <i class="material-icons right">send</i>
                                        </button>
                                        <button class="btn waves-effect waves-light" type="submit" id="btnVoteItemsAdd">انصراف
                                        <i class="material-icons right">cancel</i>
                                        </button>
                                        </div>
                                </div>
                        </p>
                      </div>

                      </div>

                      <a class="waves-effect waves-light btn delete" id="btnDelete" title="` + item.title + `" uniqueId="` + item._id + `" >حذف
                      <i class="material-icons">delete</i></a>
                    </div>   


                    
                  </div>`);
                  
            });


            $('.edit').modal();



            $('.delete').click(function (e) {
                console.log('btn clicked')
                var del = confirm("آیا قصد پاک کردن « " + $(this).attr('title') + " » را دارید؟");
                if (del == true) {
                    var voteItemId = $(this).attr('uniqueId');

                    console.log('query', {
                        text: voteItemId
                    })
                    $('.card[uniqueId=' + voteItemId + ']').fadeOut();
                    delete_voteItems(voteItemId);
                    alert("«" + $(this).attr('title') + "» با موفقیت پاک شد.");
                }
            })

        })
       
        function delete_voteItems(voteItemId) {
            console.log('voteItemId: ', voteItemId);

            post('/voteItems/delete', {
                _id: voteItemId
            }, function (response) {
                console.log('delete vote item', response);

            })
        }
    });
})(jQuery);