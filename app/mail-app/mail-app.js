var myMod = angular.module('mailApp.mailApp', ['mailApp.commonServices']);

myMod.component('mailApp', {
  templateUrl: 'mail-app/mail-app.html',
  controller: function(ViewService) {
    this.activeView = 'mail-box';
    this.isActiveClass = (view) => ViewService.isActiveClass(view, this);
  }
});