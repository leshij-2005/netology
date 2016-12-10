var tmpl = '<div class="item" data-id="{_id}">'  +
  '<div class="item__param item__param_name">{name}</div>' +
  '<div class="item__param item__param_email">{email}</div>' +
  '<div class="item__param item__param_actions"><span class="item__delete">Удалить</span><span class="item__edit">Редактировать</span></div>'
'</div>';

function addActions($element) {
  $element.find('.item__delete').click(function(){
    $.ajax({
      url: 'users/' + $element.data('id'),
      method: 'DELETE',
      success: function(){
        $element.remove();
      }
    });
  });

  $element.find('.item__edit').click(function(){
    $.get('users/' + $element.data('id'), function(response){
      response.id = response._id;

      loadData($('#edit'), response);

      $('#edit').parent().show();
    });
  });
}

getItems('users');