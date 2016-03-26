var app = angular.module('mailApp', [
  'mailApp.mailApp',
  'mailApp.mailBox',
  'mailApp.mailFull',
  'mailApp.mailInboxSent',
  'mailApp.mailNew',
  'mailApp.userCards',
  'mailApp.userCard',
  'mailApp.userNew',
  'ngMessages']);

app.run(function(EmailService, UserService) {
  EmailService._url = 'https://shining-fire-3650.firebaseio.com/mails';
  EmailService.from = 'me@mailapp.js';
  UserService._baseUrl = 'https://shining-fire-3650.firebaseio.com/users';
});