var mailBox = angular.module('mailApp.mailBox', ['mailApp.emailService']);

mailBox.component('mailBox', {
  controller: function(EmailService, ViewService, $state) {
    this.isActiveClass = (state) => $state.is(state) ? 'active' : undefined;
    this.getMail = (index) => {
      this.currentMail = this.mails[index];
      this.prevMailIndex = this.mails[index - 1] ? (index - 1) : undefined;
      this.nextMailIndex = this.mails[index + 1] ? (index + 1) : undefined;
      // #TODO need to refactoring
      $state.go('mailbox.full', {mailId: this.currentMail.id});
    };
    this.getInbox = () => {
      EmailService.getAllInbox()
        .then(mails => {
          this.mails = mails;
          this.inboxOrSent = 'inbox';
        });
    };
    this.getSent = () => {
      EmailService.getAllSent()
        .then(mails => {
          this.mails = mails;
          this.inboxOrSent = 'sent';
        });
    };
    this.deleteMail = (mail) => {
      if (this.inboxOrSent == 'inbox') {
        EmailService.deleteInbox(mail.id)
          .then(() => {
            this.getInbox();
            $state.go('mailbox.inbox');
          });
      } else if (this.inboxOrSent == 'sent') {
        EmailService.deleteSent(mail.id)
          .then(() => {
            this.getSent();
            $state.go('mailbox.sent');
          });
      }
    };
    
    this.getInbox();
  },
  templateUrl: 'mail-app/mail-box/mail-box.html'
});