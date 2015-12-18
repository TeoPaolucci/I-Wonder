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
  $('#logout-div').hide();
  $('#logout-seperator').hide();
  location.hash = '#';

  // check if there's already a session
  api.getUser(function (err, data){
    if(err) {
      console.error(err);
      var html = errorTemplate(err);
      $('#error-box').html(html);
    } else if (data.id !== "Nobody") {
      $('#logged-in-nav').show();
      $('#logout-div').show();
      $('#logout-seperator').show();
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

    // else ifs for nav bar stuff

    else {
      var path = location.hash.split('/');
      if (path[1] === 'question') {
        api.getQuestionById(path[2], oneQuestionCallback);
      }
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
          $('#logout-div').show();
          $('#logout-seperator').show();
          $('#user-id').val(data.id);
        }
        location.hash = '#home';
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
            $('#logout-div').show();
            $('#logout-seperator').show();
            $('#user-id').val(data.id);
          }
          location.hash = '#home';
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
  });

  $('#logout-button').on('click', function() {
    api.logout(function (err, data) {
      if(err) {
        console.error(err);
        var html = errorTemplate(err);
        $('#error-box').html(html);
        return;
      }
      $('#user-id').val('');
      $('#logged-in-nav').hide();
      $('#logout-div').hide();
      $('#logout-seperator').hide();
      location.hash = '#home';
    });
  });

  $('#edit-question').on('submit', function(e) {
    e.preventDefault();
    var content = form2object(event.target);
    var questionID = $('#question-id').val();
    api.updateQuestion(questionID, content, oneQuestionCallback);
  });

  $('#delete-question').on('click', function() {
    $('#question-edit-view').hide();
    $('#delete-warning-view').show();
  });

  $('#confirm-delete').on('click', function() {
    var questionID = $('#question-id').val();
    api.deleteQuestion(questionID, function (err, data) {
      if(err) {
        console.error(err);
        var html = errorTemplate(err);
        $('#error-box').html(html);
        return;
      }
      location.hash = '#home';
    });
  });

});
