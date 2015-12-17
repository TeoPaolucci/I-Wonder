'use strict';

$(document).ready(function(){
  // important ajax cookie thing
  $.ajaxSetup({
    xhrFields : {
      withCredentials : true
    }
  });

  // hide all the things and set the #url to #
  hideAllViews();
  $('#logged-in-nav').hide();
  location.hash = '#';

  // check if there's already a session
  api.getUser(function (err, data){
    if(err) {
      var html = errorTemplate(err);
      $('#error-box').html(html);
    } else if (data.id !== "Nobody") {
      $('#logged-in-nav').show();
      $('#new-question-view').show();
    }
  });

  // hashchange handlers
  var locationHashChanged = function locationHashChanged() {
    // STUFF
  };

  window.addEventListener('hashchange', locationHashChanged);

  // click handlers

});
