var module = angular.module('mailApp.userService', []);

module.service('UserService', function($http, FirebaseService) {
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