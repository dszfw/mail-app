var module = angular.module('mailApp.mailNew', []);

module.component('mailNew', {
  templateUrl: 'mail-new/mail-new.html',
  bindings: {
    onSuccess: '&'
  },
  controller: function(FormService, EmailService) {
    this.defaultFrom = EmailService.from;
    this.submit = (form) => {
      if (!form.$valid) {
        FormService.touchAllFields(form);
        return;
      }
      this.mail.date = new Date();
      this.mail.from = this.defaultFrom;
      EmailService.send(this.mail)
        .then(() => this.onSuccess());
    };
  }
});