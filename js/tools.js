// Utility functions used in the api and handler JS files

// Handlebars template compilers
var profileTemplate = Handlebars.compile($('#profile-template').html());
var multiQuestionTemplate = Handlebars.compile($('#multi-question-template').html());
var oneQuestionTemplate = Handlebars.compile($('#one-question-template').html());
var errorTemplate = Handlebars.compile($('#error-template').html());

// form2object: Takes the contents of a form and converts it into an object
// where each key is the name of each input in the form
// and the values of those keys are the contents of those inputs
var form2object = function(form) {
  var data = {};
  $(form).children().each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  console.log("Form output:");
  console.log(data);
  return data;
};

// hideAllViews: hides all "view" divs.
var hideAllViews = function() {
  $('#profile-view').hide();
  $('#update-profile-view').hide();
  $('#new-question-view').hide();
  $('#all-qs-view').hide();
  $('#one-question-view').hide();
  $('#new-answer-view').hide();
};

// callbacks specific to certain views
var allQsCallback = function (err, data) {
  if(err) {
    var alert = errorTemplate(err);
    $('#error-box').html(alert);
    console.error(err);
    return;
  }
  var html = multiQuestionTemplate(data);
  hideAllViews();
  $('#all-qs-view').html(html).show();
  if ($('#user-id').val()) {
    $('#new-question-view').show();
  }
};

var oneQuestionCallback = function (err, data) {
  if(err) {
    var alert = errorTemplate(err);
    $('#error-box').html(alert);
    console.error(err);
    return;
  }
  var html = oneQuestionTemplate(data);
  hideAllViews();
  $('#one-question-view').html(html).show();
  $('#question-id').val(data.question._id);
  if ($('#user-id').val()) {
    $('#new-answer-view').show();
  }
};


