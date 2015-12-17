var api = {
  backend: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },
  // PASSPORT
  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend + '/signup',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },

  logout: function logout(callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/logout'
    }, callback);
  },

  changePass: function changePass(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend + '/changePassword',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },

  getUser: function getUser(callback) {
    this.ajax({
      method: 'GET',
      url: this.backend,
      dataType: 'json'
    }, callback);
  },
  // PROFILE
  createUserProfile: function createUserProfile(content, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend + '/profile',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(content),
      dataType: 'json'
    }, callback);
  },

  getUserProfile: function getUserProfile(callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/profile'
    }, callback);
  },

  updateUserProfile: function updateUserProfile(content, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.backend + '/profile',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(content),
      dataType: 'json'
    }, callback);
  },

  getProfileById: function getProfileById(id, callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/profile/' + id,
      dataType: 'json'
    }, callback);
  },

  getTrustedUsers: function getTrustedUsers(callback) {
    this.ajax({
      method: 'GET',
      url: this.backend +'/profile/trust',
      dataType: 'json'
    }, callback);
  },

  addTrustedUser: function getTrustedUsers(userID, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend +'/profile/trust',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({id: userID}),
      dataType: 'json'
    }, callback);
  },

  removeTrustedUser: function getTrustedUsers(userID, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.backend +'/profile/trust',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({id: userID}),
      dataType: 'json'
    }, callback);
  },

  // QUESTIONS & ANSWERS
  getAllQuestions: function getAllQuestions(callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/question',
      dataType: 'json'
    }, callback);
  },

  createQuestion: function createQuestion(content, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend + '/question',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(content),
      dataType: 'json'
    }, callback);
  },

  getAllUserQuestions: function getAllQuestions(callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/question/user',
      dataType: 'json'
    }, callback);
  },

  getAllUserQuestionsById: function getAllUserQuestionsById(id, callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/question/user/' + id,
      dataType: 'json'
    }, callback);
  },

  getQuestionById: function getQuestionById(id, callback) {
    this.ajax({
      method: 'GET',
      url: this.backend + '/question/' + id,
      dataType: 'json'
    }, callback);
  },

  postAnswer: function postAnswer(id, content, callback) {
    this.ajax({
      method: 'POST',
      url: this.backend + '/question/' + id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(content),
      dataType: 'json'
    }, callback);
  },

  updateQuestion: function updateQuestion(id, content, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.backend + '/question/' + id,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(content),
      dataType: 'json'
    }, callback);
  },

  deleteQuestion: function deleteQuestion(id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.backend + '/question/' + id
    }, callback);
  }
};
