var tmpl = '<div class="item" data-id="{_id}">'  +
  '<div class="item__param item__param_name">{title}</div>' +
  '<div class="item__param item__param_desc">{description}</div>' +
  '<div class="item__param item__param_user">{user}</div>' +
  '<div class="item__param item__param_actions"><span class="item__cancel">Закрыть</span><span class="item__delete">Удалить</span><span class="item__edit">Редактировать</span></div>'
'</div>';

function addActions($element) {
  $element.find('.item__delete').click(function(){
    $.ajax({
      url: 'tasks/' + $element.data('id'),
      method: 'DELETE',
      success: function(){
        $element.remove();
      }
    });
  });

  $element.find('.item__edit').click(function(){
    $.get('tasks/' + $element.data('id'), function(response){
      response.id = response._id;

      $('#edit .field_user').find('option[selected]').attr('selected', false);

      loadData($('#edit'), response);

      $('#edit .field_user').find('option[value="' + response.user_id + '"]').attr('selected', true);

      $('#edit').parent().show();
    });
  });

  $element.find('.item__cancel').click(function(){
    $.ajax({
      url: 'tasks/',
      method: 'PUT',
      data: {
        id: $element.data('id'),
        active: false
      },
      success: function(){
        $element.remove();
      }
    });
  });
}

getItems('tasks');

$.ajax({
  url: 'users/',
  success: function(response){
    var items = response.map(function(item){
      return $('<option/>', {
        value: item._id,
        text: item.name
      })
    });

    $('.field_user').append(items);
  }
});