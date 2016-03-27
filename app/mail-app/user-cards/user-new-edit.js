var module = angular.module('mailApp.userNew', []);

module.component('userNew', {
  templateUrl: 'mail-app/user-cards/user-new-edit.html',
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

module.component('userEdit', {
  templateUrl: 'mail-app/user-cards/user-new-edit.html',
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