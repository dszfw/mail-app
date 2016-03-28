var myMod = angular.module('mailApp.mailApp', ['mailApp.commonServices']);

myMod.component('mailApp', {
  templateUrl: 'mail-app/mail-app.html',
  controller: function($state) {
    this.activeView = 'mail-box';
    this.isActiveClass = (state) => $state.is(state) ? 'active' : undefined;
  }
});