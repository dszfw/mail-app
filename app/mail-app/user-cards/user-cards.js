var module = angular.module('mailApp.userCards', ['mailApp.userService']);

module.component('userCards', {
  templateUrl: 'mail-app/user-cards/user-cards.html',
  controller: function(UserService, ViewService, $state) {
    this.isActive = (state) => $state.is(state) ? 'active' : undefined;
    this.getAllUsers = () => {
      getAll();
      // ViewService.switchTo('users-all', this);
    };
    // this.showNewUser = () => {
    //   ViewService.switchTo('user-new', this);
    // };
    this.getEditUser = (user) => {
      this.user = user;
      // ViewService.switchTo('user-edit', this);
    };

    this.showAllUsers();
    var self = this;

    function getAll() {
      UserService.getAll()
        .then(users => self.users = users);
    }
  }
});