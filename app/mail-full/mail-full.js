var mailFull = angular.module('mailApp.mailFull', []);

mailFull.component('mailFull', {
  bindings: {
    mail: '<',
    prevMailIndex: '<',
    nextMailIndex: '<',
    showMail: '&',
    deleteMail: '&'
  },
  templateUrl: 'mail-full/mail-full.html'
});