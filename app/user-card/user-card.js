var module = angular.module('mailApp.userCard', []);

module.component('userCard', {
  bindings: {
    user: '<',
    onEdit: '&',
    onSuccess: '&'
  },
  templateUrl: 'user-card/user-card.html',
  controller: function(UserService) {
    this.deleteUser = () => {
      UserService.delete(this.user.id)
        .then(() => this.onSuccess());
    };
  }
});