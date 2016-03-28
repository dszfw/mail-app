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
  $urlRouterProvider.otherwise('/mailbox/inbox');

  $stateProvider
    .state('mailbox', {
      url: '/mailbox',
      template: '<mail-box></mail-box>'
    })
    .state('mailbox.inbox', {
      url: '/inbox',
      template: `<mail-inbox mails="$ctrl.mails"
                             get-mail="$ctrl.getMail(index)">
                 </mail-inbox>`
    })
    .state('mailbox.sent', {
      url: '/sent',
      template: `<mail-sent mails="$ctrl.mails"
                            get-mail="$ctrl.getMail(index)">
                 </mail-sent>`
    })
    .state('mailbox.new', {
      url: '/new',
      template: '<mail-new on-success="$ctrl.getSent()"></mail-new>'
    })
    .state('mailbox.full', {
      url: '/:mailId',
      template: `<mail-full mail="$ctrl.currentMail"
                            prev-mail-index="$ctrl.prevMailIndex"
                            next-mail-index="$ctrl.nextMailIndex"
                            get-mail="$ctrl.getMail(index)"
                            delete-mail="$ctrl.deleteMail(mail)">
                 </mail-full>`
    })
    .state('users', {
      url: '/users',
      template: '<user-cards></user-cards>'
    })
    .state('users.all', {
      url: '/all',
      template: `<user-card user='usr' ng-repeat="usr in $ctrl.users"
                            on-edit="$ctrl.getEditUser(user)"
                            on-success="$ctrl.getAllUsers()">
                 </user-card>`
    })
    .state('users.new', {
      url: '/new',
      template: `<user-new on-success="$ctrl.getAllUsers()">
                 </user-new>`
    });
});