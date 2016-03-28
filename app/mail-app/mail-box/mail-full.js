var mailFull = angular.module('mailApp.mailFull', []);

mailFull.component('mailFull', {
  bindings: {
    mail: '<',
    prevMailIndex: '<',
    nextMailIndex: '<',
    getMail: '&',
    deleteMail: '&'
  },
  templateUrl: 'mail-app/mail-box/mail-full.html'
});