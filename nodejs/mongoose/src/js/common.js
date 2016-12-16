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

function syncItems(items) {
  items = items.map(function(item, idx){
    item.idx = idx;

    var $item = $(render(item, tmpl));

    if (typeof addActions != 'undefined')
      addActions($item);

    return $item;
  });

  $('.items').append(items);
}

function getItems(url){
  $.ajax({
    url: url,
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

$('#search').submitForm({
  responseElement: $('.form'),
  success: function(response) {
    $('.items').html('');

    syncItems(response);

    return false;
  }
});

$('#edit').submitForm({
  responseElement: $('.form'),
  success: function(response) {
    $('#edit').parent().hide();

    $item = $(render(response, tmpl));
    addActions($item);

    $('[data-id="' + response._id + '"]').replaceWith($item);

    return false;
  }
});

$('#reset').click(function(){
  $('.items').html('');

  getItems('tasks');
});