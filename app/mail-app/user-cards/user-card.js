var module = angular.module('mailApp.userCard', []);

module.component('userCard', {
  bindings: {
    user: '<',
    onEdit: '&',
    onSuccess: '&'
  },
  templateUrl: 'mail-app/user-cards/user-card.html',
  controller: function(UserService) {
    this.deleteUser = () => {
      UserService.delete(this.user.id)
        .then(() => this.onSuccess());
    };
  }
});