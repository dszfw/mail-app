var mailBox = angular.module('mailApp.mailBox', ['mailApp.emailService']);

mailBox.component('mailBox', {
  controller: function(EmailService, ViewService) {
    this.isActiveClass = (view) => ViewService.isActiveClass(view, this);
    this.showMail = (index) => {
      this.currentMail = this.mails[index];
      this.prevMailIndex = this.mails[index - 1] ? (index - 1) : undefined;
      this.nextMailIndex = this.mails[index + 1] ? (index + 1) : undefined;
      ViewService.switchTo('mail-full', this);
    };
    this.showNew = () => {
      ViewService.switchTo('mail-new', this);
    };
    this.showInbox = () => {
      EmailService.getAllInbox()
        .then(mails => {
          this.mails = mails;
          this.inboxOrSent = 'inbox';
          ViewService.switchTo('mail-inbox', this);
        });
    };
    this.showSent = () => {
      EmailService.getAllSent()
        .then(mails => {
          this.mails = mails;
          this.inboxOrSent = 'sent';
          ViewService.switchTo('mail-sent', this);
        });
    };
    this.deleteMail = (mail) => {
      if (this.inboxOrSent == 'inbox') {
        EmailService.deleteInbox(mail.id)
          .then(() => this.showInbox());
      } else if (this.inboxOrSent == 'sent') {
        EmailService.deleteSent(mail.id)
          .then(() => this.showSent());
      }
    };
    
    this.showInbox();
  },
  templateUrl: 'mail-app/mail-box/mail-box.html'
});