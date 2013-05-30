setup_sockets = function(tv_id){
  var notifications = io.connect('/tv_sockets/' + tv_id);
  notifications.on('show_item', function(item) {
  // item.url, item.type, where type = video / picture

    var url = item.url;
    var type = item.type; 
    var new_content;
    switch(type){
      case 'video':
        new_content = $('<iframe />', {
          name: 'myframe',
          src: url
        });
        break;

      case 'picture':
        new_content = $('<img class="img" src=' + url + '></img>');
        break;
  
      case 'mp4':
        new_content = $('<video autoplay controls><source src="'
          + url + '" type="video/mp4"></video>');
        console.log(new_content);
        break;
    }
    $('#content').html(new_content);
    console.log(item);
  });
};