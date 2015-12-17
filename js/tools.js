// Utility functions used in the api and handler JS files

// Handlebars template compilers
var profileTemplate = Handlebars.compile($('#profile-template').html());
var multiQuestionTemplate = Handlebars.compile($('#multi-question-template').html());
var oneQuestionTemplate = Handlebars.compile($('#one-question-template').html());

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
