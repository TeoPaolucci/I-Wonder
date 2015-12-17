'use strict';

$(document).ready(function(){
  // important ajax cookie thing
  $.ajaxSetup({
    xhrFields : {
      withCredentials : true
    }
  });

  // hide all the things and set the #url to '#''
  hideAllViews();
  $('#logged-in-nav').hide();
  location.hash = '#';

  // check if there's already a session
  api.getUser(function (err, data){
    if(err) {
      console.error(err);
      var html = errorTemplate(err);
      $('#error-box').html(html);
    } else if (data.id !== "Nobody") {
      $('#logged-in-nav').show();
      $('#user-id').val(data.id);
    }
    api.getAllQuestions(allQsCallback);
  });

  // hashchange handlers
  var locationHashChanged = function locationHashChanged() {
    if (location.hash === '#') {}

    else if (location.hash === '#home') {
      hideAllViews();
      api.getAllQuestions(allQsCallback);
    }
  };

  window.addEventListener('hashchange', locationHashChanged);

  // click handlers
  $('#login-form').on('submit', function(e) {
    e.preventDefault();
    var credentials = form2object(event.target);
    api.login(credentials, function (err, data) {
      if(err) {
        console.error(err);
        var html = errorTemplate(err);
        $('#error-box').html(html);
      }
      api.getUser(function (err, data){
        if(err) {
          console.error(err);
          var html = errorTemplate(err);
          $('#error-box').html(html);
        } else if (data.id !== "Nobody") {
          $('#logged-in-nav').show();
          $('#user-id').val(data.id);
        }
        api.getAllQuestions(allQsCallback);
      });
    });
  });

  $('#register-form').on('submit', function(e) {
    e.preventDefault();
    var credentials = form2object(event.target);
    api.register(credentials, function (err, data) {
      if(err) {
        console.error(err);
        var html = errorTemplate(err);
        $('#error-box').html(html);
        return;
      }
      api.login(credentials, function (err, data) {
        if(err) {
          console.error(err);
          var html = errorTemplate(err);
          $('#error-box').html(html);
          return;
        }
        api.getUser(function (err, data){
          if(err) {
            console.error(err);
            var html = errorTemplate(err);
            $('#error-box').html(html);
          } else if (data.id !== "Nobody") {
            $('#logged-in-nav').show();
            $('#user-id').val(data.id);
          }
          api.getAllQuestions(allQsCallback);
        });
        api.createUserProfile({}, function (err, data) {
          if(err) {
            console.error(err);
            var html = errorTemplate(err);
            $('#error-box').html(html);
            return;
          }
        });
      });
    });
  });

  $('#new-question').on('submit', function(e) {
    e.preventDefault();
    var content = form2object(event.target);
    api.createQuestion(content, oneQuestionCallback);
  });

  $('#new-answer').on('submit', function(e) {
    e.preventDefault();
    var content = form2object(event.target);
    var questionID = $('#question-id').val();
    api.postAnswer(questionID, content, oneQuestionCallback);
  })

});
