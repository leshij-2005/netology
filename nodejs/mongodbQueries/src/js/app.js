(function(){
  var tmpl = '<div class="item" data-id="{_id}">'  +
    '<div class="item__param item__param_name">{name}</div>' +
    '<div class="item__param item__param_phone">{phone}</div>' +
    '<div class="item__param item__param_actions"><span class="item__delete">Удалить</span><span class="item__edit">Редактировать</span></div>'
  '</div>';

  function render(data, tmpl, filters){
    var output = tmpl;
    var reg = /(?:\{)(\w+)/g;
    var reg_res;
    while (reg_res = reg.exec(output))
    {
      var binding = reg_res[1];
      var value = filters && filters[binding] ? filters[binding](data) : data[binding];
      output = output.replace('{' + binding + '}', value);
    }
    
    return output;
  };

  function loadData($form, data) {
    $.each(data, function(name, value){
      $form.find('input[name="' + name + '"]').val(value);
    });
  }

  function addActions($element) {
    $element.find('.item__delete').click(function(){
      $.post('/remove', { id: $element.data('id') }, function(){
        $element.remove();
      });
    });

    $element.find('.item__edit').click(function(){
      $.get('/get/' + $element.data('id'), function(response){
        response.id = response._id;

        loadData($('#edit'), response);

        $('#edit').parent().show();
      });
    });
  }

  function syncItems(contacts) {
    var items = contacts.map(function(contact, idx){
      contact.idx = idx;

      $item = $(render(contact, tmpl));
      addActions($item);

      return $item;
    });

    $('.items').append(items);
  }

  function getContacts(){
    $.ajax({
      url: '/list',
      beforeSend: function(){

      },
      success: function(response){
        syncItems(response);
      }
    });
  }

  $('#create').submitForm({
    responseElement: $('.form'),
    success: function(response) {
      syncItems(response);

      return false;
    }
  });

  $('#edit').submitForm({
    responseElement: $('.form'),
    success: function(response) {
      console.log(response);

      $('#edit').parent().hide();

      $item = $(render(response, tmpl));
      addActions($item);

      $('[data-id="' + response._id + '"]').replaceWith($item);

      return false;
    }
  });

  $('#search').submitForm({
    responseElement: $('.form'),
    success: function(response) {
      $('.items').html('');

      syncItems(response);

      return false;
    }
  });

  $('#reset').click(function(){
    $('.items').html('');

    getContacts();
  });

  getContacts();
})();