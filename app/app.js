var app = angular.module('mailApp', [
  'mailApp.mailApp',
  'mailApp.mailBox',
  'mailApp.mailFull',
  'mailApp.mailInboxSent',
  'mailApp.mailNew',
  'mailApp.userCards',
  'mailApp.userCard',
  'mailApp.userNew',
  'ngMessages',
  'ui.router']);

app.run(function(EmailService, UserService) {
  EmailService._url = 'https://shining-fire-3650.firebaseio.com/mails';
  EmailService.from = 'me@mailapp.js';
  UserService._baseUrl = 'https://shining-fire-3650.firebaseio.com/users';
});

app.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/mailbox');

  $stateProvider
    .state('mailbox', {
      url: '/mailbox',
      template: '<mail-box></mail-box>'
    })
    .state('mailbox.inbox', {
      url: '/inbox',
      template: `<mail-inbox mails="$ctrl.mails"
                             show-mail="$ctrl.showMail(index)">
                 </mail-inbox>`
    })
    .state('mailbox.sent', {
      url: '/sent',
      template: `<mail-sent mails="$ctrl.mails"
                            show-mail="$ctrl.showMail(index)">
                 </mail-sent>`
    })
    .state('mailbox.new', {
      url: '/new',
      template: '<mail-new on-success="$ctrl.showSent()"></mail-new>'
    });
});