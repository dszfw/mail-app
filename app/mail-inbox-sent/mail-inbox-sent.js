var module = angular.module('mailApp.mailInboxSent', []);

module.component('mailInbox', {
  templateUrl: 'mail-inbox-sent/mail-inbox-sent.html',
  bindings: {
    mails: '<',
    showMail: '&'
  },
  controller: function() {
    this.previewMode = 'from';
  }
});

module.component('mailSent', {
  templateUrl: 'mail-inbox-sent/mail-inbox-sent.html',
  bindings: {
    mails: '<',
    showMail: '&'
  },
  controller: function() {
    this.previewMode = 'to';
  }
});

module.directive('mailPreview', function() {
  return {
    restrict: 'A',
    scope: {
      mail: '<',
      previewMode: '<'
    },
    templateUrl: 'mail-inbox-sent/mail-preview.html'
  };
});