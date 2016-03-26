var app = angular.module('mailApp', ['ngMessages']);

app.component('mailApp', {
  templateUrl: 'mail-app.html',
  controller: function(ViewService) {
    this.activeView = 'mail-box';
    this.isActiveClass = (view) => ViewService.isActiveClass(view, this);
  }
});

app.component('mailBox', {
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
  templateUrl: 'mail-box.html'
});

app.component('mailInbox', {
  templateUrl: 'mail-inbox-sent.html',
  bindings: {
    mails: '<',
    showMail: '&'
  },
  controller: function() {
    this.previewMode = 'from';
  }
});

app.component('mailSent', {
  templateUrl: 'mail-inbox-sent.html',
  bindings: {
    mails: '<',
    showMail: '&'
  },
  controller: function() {
    this.previewMode = 'to';
  }
});

app.component('mailFull', {
  bindings: {
    mail: '<',
    prevMailIndex: '<',
    nextMailIndex: '<',
    showMail: '&',
    deleteMail: '&'
  },
  templateUrl: 'mail-full.html'
});

app.directive('mailPreview', function() {
  return {
    restrict: 'A',
    scope: {
      mail: '<',
      previewMode: '<'
    },
    templateUrl: 'mail-preview.html'
  };
});

app.component('mailNew', {
  templateUrl: 'mail-new.html',
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

app.component('userCards', {
  templateUrl: 'user-cards.html',
  controller: function(UserService, ViewService) {
    this.isActive = (view) => ViewService.isActiveClass(view, this);
    this.showAllUsers = () => {
      getAll();
      ViewService.switchTo('users-all', this);
    };
    this.showNewUser = () => {
      ViewService.switchTo('user-new', this);
    };
    this.showEditUser = (user) => {
      this.user = user;
      ViewService.switchTo('user-edit', this);
    };

    this.showAllUsers();
    var self = this;

    function getAll() {
      UserService.getAll()
        .then(users => self.users = users);
    }
  }
});

app.component('userCard', {
  bindings: {
    user: '<',
    onEdit: '&',
    onSuccess: '&'
  },
  templateUrl: 'user-card.html',
  controller: function(UserService) {
    this.deleteUser = () => {
      UserService.delete(this.user.id)
        .then(() => this.onSuccess());
    };
  }
});

app.component('userNew', {
  templateUrl: 'user-new-edit.html',
  bindings: {
    onSuccess: '&'
  },
  controller: function(UserService, FormService) {
    this.action = 'Create';
    this.submit = (form) => {
      if (!form.$valid) {
        FormService.touchAllFields(form);
        return;
      }
      UserService.create(this.user)
        .then(userId => {
          this.onSuccess();
        });
    };
  }
});

app.component('userEdit', {
  templateUrl: 'user-new-edit.html',
  bindings: {
    user: '=',
    onSuccess: '&'
  },
  controller: function(UserService, FormService) {
    this.submit = form => {
      if (!form.$valid) {
        FormService.touchAllFields(form);
        return;
      }
      UserService.update(this.user)
        .then(() => this.onSuccess());
    };

    this.action = 'Update';
    this.user.birthdate = new Date(Date.parse(this.user.birthdate));
  }
});

app.service('UserService', function($http, FirebaseService) {
  this.getAll = () => {
    return $http.get(this._baseUrl + '.json')
      .then(result => FirebaseService.normalize(result.data));
  };
  this.create = user => {
    return $http.post(this._baseUrl + '.json', user)
      .then(result => result.data);
  };
  this.update = user => {
    return $http.put(this._baseUrl + '/' + user.id + '.json', user)
      .then(result => result.data);
  };
  this.delete = userId => {
    return $http.delete(this._baseUrl + '/' + userId + '.json')
      .then(result => result.data);
  };
});

app.service('EmailService', function($http, FirebaseService) {
  this.getAllInbox = () => {
    return $http.get(this._url + '/inbox.json')
      .then(result => FirebaseService.normalize(result.data));
  };
  this.getAllSent = () => {
    return $http.get(this._url + '/sent.json')
      .then(result => FirebaseService.normalize(result.data));
  };
  this.send = (mail) => {
    return $http.post(this._url + '/sent.json', mail)
      .then(result => result.data)
      .then(data => {
        if (mail.to === this.from) {
          $http.post(this._url + '/inbox.json', mail);
        }
        return data;
      });
  };
  this.deleteSent = mailId => {
    return $http.delete(this._url + '/sent/' + mailId + '.json')
      .then(result => result.data);
  };
  this.deleteInbox = mailId => {
    return $http.delete(this._url + '/inbox/' + mailId + '.json')
      .then(result => result.data);
  };
});

app.service('ViewService', function() {
  this.isActiveClass = (view, component) => {
    if (view == component.activeView) return 'active';
  };
  this.switchTo = (newView, component) => component.activeView = newView;
});

app.service('FormService', function() {
  this.touchAllFields = (form) => {
    var err = form.$error;
    Object.keys(err).forEach((key) => {
      err[key].forEach((el) => el.$setTouched());
    });
  };
});

app.service('FirebaseService', function() {
  this.normalize = function(obj) {
    if (!obj) return;
    return Object.keys(obj).map(key => {
      obj[key].id = key;
      return obj[key];
    });
  };
});

app.run(function(EmailService, UserService) {
  EmailService._url = 'https://shining-fire-3650.firebaseio.com/mails';
  EmailService.from = 'me@mailapp.js';
  UserService._baseUrl = 'https://shining-fire-3650.firebaseio.com/users';
});